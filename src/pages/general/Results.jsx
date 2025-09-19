import React, { useEffect, useState } from 'react';
import questions from './questions';
import CasaImg from '../../assets/casa.jpg'; // ajusta la ruta según tu estructura

function Results() {
  const [dataFrameRow, setDataFrameRow] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('avaluoAnswers');
    if (saved) {
      const answersObj = JSON.parse(saved);

      const importantQuestions = questions.slice(0, 15);
      const row = {};
      importantQuestions.forEach(q => {
        const val = answersObj[q.id];
        row[q.field] =
          typeof val === 'string' && !isNaN(val) ? Number(val) : val;
      });

      const payload = { data: row };
      setDataFrameRow(payload);

      fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(r => r.json())
        .then(res => {
          console.log("Respuesta del back:", res);
          setPrediction({ prediction: res.message });
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resultados del Avalúo</h1>

      {prediction ? (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Imagen local */}
          <img
            src={CasaImg}
            alt="Casa evaluada"
            className="w-full h-64 object-cover"
          />

          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Avalúo completado:
            </h2>
            <p className="text-3xl font-extrabold text-green-600 mb-2">
              ${prediction.prediction[0].toFixed(2)} DLS
            </p>
            <p className="text-gray-500">
              Recuerda que este avalúo considera un ±5% de error.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Procesando tus respuestas...
        </p>
      )}
    </div>
  );
}

export default Results;
