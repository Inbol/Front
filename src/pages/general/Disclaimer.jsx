import React from "react";
import { useNavigate } from "react-router-dom";

function Disclaimer() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl bg-white p-8 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Antes de comenzar</h2>
        <p className="text-gray-700 mb-6">
          Puedes elegir entre dos formas de valuar tu casa.  
          Ten en cuenta que el resultado dependerá de la cantidad de preguntas que contestes:
        </p>

        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li><strong>Avalúo rápido:</strong> 20 preguntas, precisión aproximada de ±30%.</li>
          <li><strong>Avalúo detallado:</strong> 40 preguntas, precisión aproximada de ±10%.</li>
        </ul>

        <div className="flex justify-between gap-4">
          <button 
            className="bg-secondary-500 hover:bg-primary-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={() => navigate("/value/quick")}
          >
            Avalúo Rápido
          </button>
          <button 
            className="bg-secondary-500 hover:bg-primary-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={() => navigate("/value/full")}
          >
            Avalúo Detallado
          </button>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
