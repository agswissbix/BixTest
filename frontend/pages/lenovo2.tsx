import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    // Login data
    username: '',
    password: '',
    // Customer data
    company: '',
    lastName: '',
    firstName: '',
    phone: '',
    address: '',
    location: '',
    email: '',
    // Repair data
    brand: '',
    model: '',
    userPassword: '',
    // Basic repair options
    replaceStorage: false,
    upgradeStorage: false,
    factoryReset: false,
    systemUpgrade: false,
    otherHardwareIssues: false,
    // Problem description
    description: '',
    // PC conditions
    noDamage: false,
    screenDamage: false,
    caseDamage: false,
    portDamage: false,
    otherDamage: false,
    // Files
    files: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: [...Array.from(e.target.files)]
    }));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const LoginPage = () => (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader className="text-2xl font-bold text-center">Login</CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button onClick={handleNextPage} className="w-full">
            Accedi
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FormPage = () => (
    <Card className="w-full max-w-3xl mx-auto mt-8 mb-8">
      <CardHeader className="text-2xl font-bold">Form Riparazione PC</CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Customer Data Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Dati cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="company"
                placeholder="Azienda"
                value={formData.company}
                onChange={handleInputChange}
              />
              <Input
                name="lastName"
                placeholder="Cognome"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <Input
                name="firstName"
                placeholder="Nome"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                name="phone"
                placeholder="Telefono"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Input
                name="address"
                placeholder="Indirizzo"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Input
                name="location"
                placeholder="Luogo"
                value={formData.location}
                onChange={handleInputChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Repair Data Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Dati riparazione</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="brand"
                placeholder="Marca"
                value={formData.brand}
                onChange={handleInputChange}
              />
              <Input
                name="model"
                placeholder="Modello"
                value={formData.model}
                onChange={handleInputChange}
              />
              <Input
                name="userPassword"
                placeholder="Utente/Password"
                value={formData.userPassword}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Basic Repair Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Riparazione di base</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="replaceStorage"
                  checked={formData.replaceStorage}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'replaceStorage', type: 'checkbox', checked }
                    })
                  }
                />
                <label>Sostituzione HDD/SSD Rotto</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="upgradeStorage"
                  checked={formData.upgradeStorage}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'upgradeStorage', type: 'checkbox', checked }
                    })
                  }
                />
                <label>Upgrade HDD/SSD</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="factoryReset"
                  checked={formData.factoryReset}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'factoryReset', type: 'checkbox', checked }
                    })
                  }
                />
                <label>Ripristino Sistema di fabbrica</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="systemUpgrade"
                  checked={formData.systemUpgrade}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'systemUpgrade', type: 'checkbox', checked }
                    })
                  }
                />
                <label>Upgrade sistema</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name="otherHardwareIssues"
                  checked={formData.otherHardwareIssues}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'otherHardwareIssues', type: 'checkbox', checked }
                    })
                  }
                />
                <label>Altri problemi hardware</label>
              </div>
            </div>
          </section>

          {/* Problem Description Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Descrizione del problema</h3>
            <Textarea
              name="description"
              placeholder="Descrizione del problema"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-32"
            />
          </section>

          <Button onClick={handleNextPage} className="w-full">
            Avanti
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FilePage = () => (
    <Card className="w-full max-w-3xl mx-auto mt-8 mb-8">
      <CardHeader className="text-2xl font-bold">
        Condizioni del pc al momento del ritiro
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* PC Conditions Section */}
          <section className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                name="noDamage"
                checked={formData.noDamage}
                onCheckedChange={(checked) =>
                  handleInputChange({
                    target: { name: 'noDamage', type: 'checkbox', checked }
                  })
                }
              />
              <label>Nessun danno</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                name="screenDamage"
                checked={formData.screenDamage}
                onCheckedChange={(checked) =>
                  handleInputChange({
                    target: { name: 'screenDamage', type: 'checkbox', checked }
                  })
                }
              />
              <label>Schermo graffiato/rotto</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                name="caseDamage"
                checked={formData.caseDamage}
                onCheckedChange={(checked) =>
                  handleInputChange({
                    target: { name: 'caseDamage', type: 'checkbox', checked }
                  })
                }
              />
              <label>Scocca ammaccata</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                name="portDamage"
                checked={formData.portDamage}
                onCheckedChange={(checked) =>
                  handleInputChange({
                    target: { name: 'portDamage', type: 'checkbox', checked }
                  })
                }
              />
              <label>Porte usb/alimentazione danneggiate</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                name="otherDamage"
                checked={formData.otherDamage}
                onCheckedChange={(checked) =>
                  handleInputChange({
                    target: { name: 'otherDamage', type: 'checkbox', checked }
                  })
                }
              />
              <label>Altri danni</label>
            </div>
          </section>

          {/* File Upload Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Carica foto</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 mb-4" />
                    <p className="mb-2 text-sm text-gray-500">
                      Clicca per caricare o scattare foto
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {formData.files.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold">File selezionati:</p>
                  <ul className="list-disc pl-5">
                    {formData.files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <Button onClick={() => console.log(formData)} className="w-full">
            Invia
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {currentPage === 1 && <LoginPage />}
      {currentPage === 2 && <FormPage />}
      {currentPage === 3 && <FilePage />}
    </div>
  );
};

export default App;
