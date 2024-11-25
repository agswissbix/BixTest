import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Upload, X } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-xl font-bold mb-4 pb-2 border-b">{title}</h2>
    {children}
  </div>
);

const LoginPage = ({ onNext }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            onClick={onNext}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Accedi
          </button>
        </div>
      </div>
    </div>
  );
};

const RepairFormPage = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    clientData: {
      azienda: '',
      cognome: '',
      nome: '',
      telefono: '',
      indirizzo: '',
      luogo: '',
      email: ''
    },
    repairData: {
      marca: '',
      modello: '',
      utentePassword: ''
    },
    basicRepair: {
      sostituzioneHdd: false,
      upgradeHdd: false,
      ripristinoSistema: false,
      upgradeSistema: false,
      altriProblemiHw: false
    },
    descrizione: ''
  });

  const updateClientData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      clientData: { ...prev.clientData, [field]: value }
    }));
  };

  const updateRepairData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      repairData: { ...prev.repairData, [field]: value }
    }));
  };

  const updateBasicRepair = (field, value) => {
    setFormData(prev => ({
      ...prev,
      basicRepair: { ...prev.basicRepair, [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Scheda Riparazione</h1>
        
        <Section title="Dati Cliente">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['azienda', 'cognome', 'nome', 'telefono', 'indirizzo', 'luogo'].map(field => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">{field}</label>
                <input
                  type={field === 'telefono' ? 'tel' : 'text'}
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.clientData[field]}
                  onChange={(e) => updateClientData(field, e.target.value)}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.clientData.email}
                onChange={(e) => updateClientData('email', e.target.value)}
              />
            </div>
          </div>
        </Section>

        <Section title="Dati Riparazione">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['marca', 'modello'].map(field => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">{field}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.repairData[field]}
                  onChange={(e) => updateRepairData(field, e.target.value)}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Utente/Password</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.repairData.utentePassword}
                onChange={(e) => updateRepairData('utentePassword', e.target.value)}
              />
            </div>
          </div>
        </Section>

        <Section title="Riparazione di Base">
          <div className="space-y-3">
            {[
              ['sostituzioneHdd', 'Sostituzione HDD/SSD Rotto'],
              ['upgradeHdd', 'Upgrade HDD/SSD'],
              ['ripristinoSistema', 'Ripristino Sistema di Fabbrica'],
              ['upgradeSistema', 'Upgrade Sistema'],
              ['altriProblemiHw', 'Altri Problemi Hardware']
            ].map(([field, label]) => (
              <label key={field} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  checked={formData.basicRepair[field]}
                  onChange={(e) => updateBasicRepair(field, e.target.checked)}
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Descrizione del Problema">
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            value={formData.descrizione}
            onChange={(e) => setFormData(prev => ({ ...prev, descrizione: e.target.value }))}
            placeholder="Descrivi il problema..."
          />
        </Section>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onPrev}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Indietro
          </button>
          <button
            onClick={onNext}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Avanti
          </button>
        </div>
      </div>
    </div>
  );
};

const ConditionsPage = ({ onPrev }) => {
  const [conditions, setConditions] = useState({
    nessunDanno: false,
    schermoRotto: false,
    scoccaAmmaccata: false,
    porteDanneggiate: false,
    altriDanni: false
  });
  const [files, setFiles] = useState([]);
  const fileInputRef = React.useRef(null);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Condizioni del PC al momento del ritiro</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="space-y-3 mb-6">
            {[
              ['nessunDanno', 'Nessun danno'],
              ['schermoRotto', 'Schermo graffiato/rotto'],
              ['scoccaAmmaccata', 'Scocca ammaccata'],
              ['porteDanneggiate', 'Porte usb/alimentazione danneggiate'],
              ['altriDanni', 'Altri danni']
            ].map(([field, label]) => (
              <label key={field} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  checked={conditions[field]}
                  onChange={(e) => setConditions(prev => ({ ...prev, [field]: e.target.checked }))}
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="flex flex-col items-center">
                <Upload size={48} className="text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500">
                  Trascina i file qui o clicca per selezionarli
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Seleziona File
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Camera size={20} /> Usa Fotocamera
                  </button>
                </div>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">File selezionati:</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={onPrev}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Indietro
            </button>
            <button
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Completa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, 3));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(currentPage / 3) * 100}%` }}
        />
      </div>
      
      <div className="fixed top-4 right-4 bg-white px-4 py-2 rounded-full shadow">
        <span className="font-medium">Pagina {currentPage} di 3</span>
      </div>

      {currentPage === 1 && <LoginPage onNext={nextPage} />}
      {currentPage === 2 && <RepairFormPage onNext={nextPage} onPrev={prevPage} />}
      {currentPage === 3 && <ConditionsPage onPrev={prevPage} />}
    </div>
  );
};

export default App;
