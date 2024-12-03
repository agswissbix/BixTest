import Select from "@/components/htmlComponents/select"
import { Settings } from 'lucide-react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Droppable } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';

export default function FieldSettings() {
    return (
            <div>
                <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full h-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex w-full h-0.5/6">
                    <div className="w-5/6 p-1 flex">
                        <div className="w-2/6 p-1">
                            <label>ID</label>
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-bixcolor-light sm:text-sm/6"></input>
                        </div>
                        <div className="w-2/6 p-1">
                            <label>Descrizione</label>
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-bixcolor-light sm:text-sm/6"></input>
                        </div>
                        <div className="w-2/6 p-1">
                            <label>Tipo</label>
                            <Select
                                name = "select-fieldtype"
                                options={[]}
                            />
                        </div>
                    </div>
                    <div className="w-1/6 relative">
                        <button className="w-full justify-center rounded-md bg-bixcolor-default text-sm/8 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default absolute top-1/2 transform -translate-y-1/2">
                            Salva
                        </button>
                    </div>

                </div>
                <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full h-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex-col w-full h-4/6">
                    <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between">
                        <div className="w-1/12 h-full p-1">
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  "/>
                        </div>
                        <div className="w-9/12 h-full p-1">
                            <span>tablename</span>

                        </div>
                        <div className="w-2/12 h-full flex items-center justify-end space-x-2">
                            <button type="button"
                                    className="rounded-full text-gray-600 hover:text-gray-400 focus:text-gray-400  ">
                                <Settings/>
                            </button>
                        </div>
                    </div>
                    <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between">
                        a
                    </div>
                    <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between">
                        a
                    </div>
                    <div className="z-10 top-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between">
                        a
                    </div>
                    


                </div>
        </div>
    )
}