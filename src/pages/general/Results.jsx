import React, { useEffect, useState } from 'react';
import questions from './questions';

function Results() {
  const [dataFrameRow, setDataFrameRow] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('avaluoAnswers');
    if (saved) {
      const answersObj = JSON.parse(saved);

      // 🔹 tomar solo las preguntas que tienen "field" (las importantes)
      const importantQuestions = questions.slice(0, 15); // tus 15 preguntas

      // 🔹 armar objeto tipo fila de DataFrame
      const row = {};
      importantQuestions.forEach(q => {
        const val = answersObj[q.id];
        // si es numérico convertir a Number
        row[q.field] =
          typeof val === 'string' && !isNaN(val) ? Number(val) : val;
      });

      // 🔹 aquí lo envolvemos en un objeto "data"
      const payload = { data: row };

      setDataFrameRow(payload);

      // opcional: enviar al backend
      fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // 👈 envías el payload completo
      })
        .then(r => r.json())
        .then(res => setPrediction(res.prediction))
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Resultados</h1>

      <h2 className="text-xl font-semibold mb-2">Fila tipo DataFrame:</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6">
        {JSON.stringify(dataFrameRow, null, 2)}
      </pre>

      {prediction !== null && (
        <div className="bg-green-100 p-4 rounded-xl">
          <h3 className="text-lg font-bold text-green-800">Predicción:</h3>
          <p className="text-green-700 text-xl">{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default Results;
