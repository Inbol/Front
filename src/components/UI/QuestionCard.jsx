import React from 'react';

function QuestionCard({ question, onAnswer, selected }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>

      {/* Si es input numérico */}
      {question.inputType === 'number' ? (
        <input
          type="number"
          placeholder={question.placeholder || 'Ingresa un número'}
          className="p-3 border rounded-xl"
          value={selected ?? ''}
          onChange={(e) => onAnswer(question.id, Number(e.target.value))}
        />
      ) : (
        // Si tiene opciones múltiples
        <div className="flex flex-col gap-3">
          {question.options.map((opt, index) => (
            <label
              key={index}
              className={`p-3 border rounded-xl cursor-pointer 
                ${selected === opt.value ? 'bg-secondary-500 text-white border-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}
              onClick={() => onAnswer(question.id, opt.value)}
            >
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
