// src/pages/general/questions.js
const questions = [
  {
    id: 1,
    field: "GrLivArea",
    question: "¿Cuál es el área habitable (GrLivArea) de la casa? (ft²)",
    inputType: "number",
    placeholder: "Ingresa el área en ft²",
  },
  {
    id: 2,
    field: "ExterQual",
    question: "¿Cómo calificarías la calidad exterior (ExterQual)?",
    options: [
      { label: "Excepcional (Ex)", value: 5 },
      { label: "Muy buena (Gd)", value: 4 },
      { label: "Promedio (TA)", value: 3 },
      { label: "Regular (Fa)", value: 2 },
      { label: "Mala (Po)", value: 1 },
    ],
  },
  {
    id: 3,
    field: "GarageCars",
    question: "¿Cuántos autos caben en el garage (GarageCars)?",
    options: [
      { label: "0 autos", value: 0 },
      { label: "1 auto", value: 1 },
      { label: "2 autos", value: 2 },
      { label: "3 autos o más", value: 3 },
    ],
  },
  {
    id: 4,
    field: "LotArea",
    question: "¿Cuál es el área total del lote (LotArea)? (ft²)",
    inputType: "number",
    placeholder: "Ingresa el área en ft²",
  },
  {
    id: 5,
    field: "OverallQual",
    question:
      "¿Cuál es la calidad general de la casa (OverallQual)? (1 (muy malo)-10 (muy excelente))",
    inputType: "number",
    placeholder: "Del 1 al 10",
  },
  {
    id: 6,
    field: "TotalBsmtSF",
    question:
      "¿Cuál es el área total del sótano (TotalBsmtSF)? (ft²) Nota: Si no tiene sótano, ingresa 0",
    inputType: "number",
    placeholder: "Ingresa el área total en ft²",
  },
  {
    id: 7,
    field: "BsmtFinSF1",
    question:
      "¿Cuántos pies cuadrados terminados hay en el sótano (BsmtFinSF1)? Nota: Si no tiene sótano, ingresa 0",
    inputType: "number",
    placeholder: "Ingresa ft² terminados",
  },
  {
    id: 8,
    field: "1stFlrSF",
    question: "¿Cuál es el área de la primera planta (1stFlrSF)? (ft²)",
    inputType: "number",
    placeholder: "Ingresa el área en ft²",
  },
  {
    id: 9,
    field: "GarageArea",
    question: "¿Cuál es el área del garage (GarageArea)? (ft²)",
    inputType: "number",
    placeholder: "Ingresa el área del garage",
  },
  {
    id: 10,
    field: "2ndFlrSF",
    question: "¿Cuál es el área de la segunda planta (2ndFlrSF)? (ft²)",
    inputType: "number",
    placeholder: "Ingresa el área de la segunda planta",
  },
  {
    id: 11,
    field: "YearBuilt",
    question: "¿En qué año se construyó la casa (YearBuilt)?",
    inputType: "number",
    placeholder: "Año de construcción",
  },
  {
    id: 12,
    field: "YearRemodAdd",
    question: "¿En qué año se remodeló por última vez (YearRemodAdd)?",
    inputType: "number",
    placeholder: "Año de remodelación",
  },
  {
    id: 13,
    field: "LandContour",
    question: "¿Cuál es el contorno del terreno (LandContour)?",
    options: [
      { label: "Nivelado (Lvl)", value: "Lvl" },
      { label: "Bancal (Bnk)", value: "Bnk" },
      { label: "Colina (HLS)", value: "HLS" },
      { label: "Desigual (Low)", value: "Low" },
    ],
  },
  {
    id: 14,
    field: "TotRmsAbvGrd",
    question: "¿Cuántos cuartos totales hay por encima del suelo (TotRmsAbvGrd)?",
    inputType: "number",
    placeholder: "Número de cuartos",
  },
  {
    id: 15,
    field: "OverallCond",
    question:
      "¿Cuál es la condición general de la casa (OverallCond)? (1 (muy mala)-10 (muy excelente))",
    inputType: "number",
    placeholder: "Del 1 al 10",
  },
];

export default questions;
