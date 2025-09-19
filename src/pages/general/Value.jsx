import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from '../../components/UI/QuestionCard';
import CustomButton from '../../components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';

import questions from './questions';

function Value({ mode = "quick" }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // Selección de preguntas según modo
  const activeQuestions = mode === "quick" ? questions.slice(0, 15) : questions;
  const progress = ((current + 1) / activeQuestions.length) * 100;

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

const nextQuestion = () => {
  // ✅ Solo avanza si hay respuesta para la pregunta actual
  if (answers[activeQuestions[current].id] === undefined || answers[activeQuestions[current].id] === null) {
    alert("Por favor responde esta pregunta antes de continuar.");
    return;
  }

  if (current < activeQuestions.length - 1) {
    setCurrent(current + 1);
  } else {
    // 🔹 Siempre guardar solo las primeras 15 respuestas
    const first15Ids = questions.slice(0, 15).map(q => q.id);
    const filteredAnswers = Object.fromEntries(
      Object.entries(answers).filter(([id]) =>
        first15Ids.includes(Number(id))
      )
    );

    localStorage.setItem('avaluoAnswers', JSON.stringify(filteredAnswers));
    console.log("✅ Respuestas finales (solo primeras 15):", filteredAnswers);
    setFinished(true);
    }
  };

  const handleResults = () => {
    navigate("/results");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[60%]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Avalúo {mode === "quick" ? "Rápido" : "Detallado"}
        </h1>

        {!finished ? (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-secondary-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {activeQuestions[current] && (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <QuestionCard
                  question={activeQuestions[current]}
                  onAnswer={handleAnswer}
                  selected={answers[activeQuestions[current].id]}
                />
              </motion.div>
            )}

            <div className="flex justify-between mt-8 items-center">
              <p className="text-gray-500">
                Pregunta {current + 1} de {activeQuestions.length}
              </p>
              <CustomButton
                texto={current === activeQuestions.length - 1 ? "Finalizar" : "Siguiente"}
                style="terciario"
                onClick={nextQuestion}
                disabled={!answers[activeQuestions[current].id]}
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">¡Has terminado tu avalúo!</h2>
            <p className="text-gray-700 mb-6">
              Tu avalúo <strong>{mode === "quick" ? "rápido" : "detallado"}</strong> se ha completado con éxito.
            </p>
            <CustomButton
              texto="Ver resultados"
              style="terciario"
              onClick={handleResults}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Value;
