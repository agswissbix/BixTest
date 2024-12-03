import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { Settings } from 'lucide-react';

interface Table {
    id: string;
    name: string;
    workspaceorder: number;
}

interface Workspace {
    id: string;
    name: string;
    icon: string;
    order: number;
    tables: Table[];
}

interface Workspaces {
    workspaces?: Workspace[];
}

const TestTablesList: React.FC<Workspaces> = ({ workspaces = [] }) => {


    
    const onDragEnd = (result: any) => {

        console.info(result);

        const { destination, source, draggableId } = result;
        
        if (!destination) return;
        
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;
        
        // Trova il workspace di origine
        const sourceWorkspace = workspaces.find(w => 
            `table-droppable-${w.id}` === source.droppableId
        );
        
        // Trova il workspace di destinazione
        const destWorkspace = workspaces.find(w => 
            `table-droppable-${w.id}` === destination.droppableId
        );
        
        if (!sourceWorkspace || !destWorkspace) return;
        
        // Crea una copia del workspace di origine
        const newSourceTables = Array.from(sourceWorkspace.tables);
        
        // Rimuovi l'elemento dalla posizione originale
        const [removed] = newSourceTables.splice(source.index, 1);
        
        // Se stesso workspace, inserisci nella nuova posizione
        if (sourceWorkspace.id === destWorkspace.id) {
            newSourceTables.splice(destination.index, 0, removed);
            sourceWorkspace.tables = newSourceTables;
        } else {
            // Se workspace diverso, aggiorna entrambi i workspace
            const newDestTables = Array.from(destWorkspace.tables);
            newDestTables.splice(destination.index, 0, removed);
            destWorkspace.tables = newDestTables;
            sourceWorkspace.tables = newSourceTables;
        }
    };

    const saveTablesOrder = async () => {
        /*
        let count = 0
        workspaces.forEach(workspace=> {
            workspace.tables.forEach((table) => {
                table.workspaceorder = count;
                count++;
  
            });
        });
        console.info(workspaces);
        */

    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <button onClick={saveTablesOrder}>save</button>
            <div className="top-0  w-full h-5/6 cursor-default overflow-auto">
                        {workspaces.map((workspace, index) => (
                            <div className="z-10 top-0 bg-gray-50 rounded-lg shadow-md  border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-3 mt-3">
                                <h2 className="font-bold">{workspace.name}</h2>
                                <Droppable
                                    droppableId={`table-droppable-${workspace.id}`}
                                    direction="vertical"
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="top-0 w-full h-5/6 cursor-default overflow-hidden min-h-12"
                                        >
                                            {workspace.tables.map((table, index2) => (
                                                <Draggable
                                                    key={table.id} // Utilizzo di un ID univoco
                                                    draggableId={`table-draggable-${table.id}`}
                                                    index={index2}
                                                >   
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="z-10 top-0 bg-white rounded-lg shadow-md border border-gray-300 w-full cursor-default overflow-auto mx-auto p-2.5 mb-2 mt-2 flex items-center justify-between"
                                                        >
                                                                <div className="w-1/12 h-full p-1">

                                                                {/*USARE SWITCH*/}
                                                                <input id="default-checkbox" type="checkbox" value="" checked={table.workspaceorder !== null} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  "/>
                                                                {/*USARE SWITCH*/}

                                                                </div>
                                                                <div className="w-9/12 h-full p-1">
                                                                    <span>{table.name}</span>
                                                                </div>
                                                                <div className="w-2/12 h-full flex items-center justify-end space-x-2">
                                                                    <button type="button"
                                                                            className="rounded-full text-gray-600 hover:text-gray-400 focus:text-gray-400">
                                                                        <Settings/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
        </DragDropContext>
    );
};

export default TestTablesList;