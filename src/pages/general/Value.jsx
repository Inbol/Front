import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from '../../components/UI/QuestionCard';
import CustomButton from '../../components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';

// Importa tus preguntas
import questions from './questions';

function Value({ mode = "quick" }) { // modo por prop: "quick" o "full"
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
    if (current < activeQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Guardamos respuestas en localStorage
      localStorage.setItem('avaluoAnswers', JSON.stringify(answers));
      console.log("✅ Respuestas finales:", answers);
      setFinished(true);
    }
  };

  const handleResults = () => {
    navigate("/results"); // Va a la página de resultados
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[60%]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Avalúo {mode === "quick" ? "Rápido" : "Detallado"}
        </h1>

        {!finished ? (
          <>
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-secondary-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Pregunta actual */}
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

            {/* Footer de control */}
            <div className="flex justify-between mt-8 items-center">
              <p className="text-gray-500">
                Pregunta {current + 1} de {activeQuestions.length}
              </p>
              <CustomButton
                texto={current === activeQuestions.length - 1 ? "Finalizar" : "Siguiente"}
                style="terciario"
                onClick={nextQuestion}
              />
            </div>
          </>
        ) : (
          // Pantalla final
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
