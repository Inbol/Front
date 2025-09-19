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

  {
    id: 16,
    field: "Neighborhood",
    question: "¿En qué vecindario se encuentra la casa?",
    options: [
      { label: "Centro", value: "Centro" },
      { label: "Suburbios", value: "Suburbios" },
      { label: "Zona rural", value: "Rural" },
    ],
  },
  {
    id: 17,
    field: "BldgType",
    question: "¿Qué tipo de edificio es?",
    options: [
      { label: "Casa unifamiliar", value: "1Fam" },
      { label: "Dúplex", value: "Duplex" },
      { label: "Adosada", value: "Twnhs" },
    ],
  },
  {
    id: 18,
    field: "HouseStyle",
    question: "¿Cuál es el estilo de la casa?",
    options: [
      { label: "1 piso", value: "1Story" },
      { label: "2 pisos", value: "2Story" },
      { label: "1.5 pisos", value: "1.5Fin" },
    ],
  },
  {
    id: 19,
    field: "Heating",
    question: "¿Qué sistema de calefacción tiene la casa?",
    options: [
      { label: "Gas natural", value: "GasA" },
      { label: "Eléctrico", value: "Eléctrico" },
      { label: "Otro", value: "Otro" },
    ],
  },
  {
    id: 20,
    field: "CentralAir",
    question: "¿Tiene aire acondicionado central?",
    options: [
      { label: "Sí", value: "Y" },
      { label: "No", value: "N" },
    ],
  },
  {
    id: 21,
    field: "KitchenQual",
    question: "¿Calidad de la cocina?",
    options: [
      { label: "Excepcional (Ex)", value: 5 },
      { label: "Muy buena (Gd)", value: 4 },
      { label: "Promedio (TA)", value: 3 },
      { label: "Regular (Fa)", value: 2 },
      { label: "Mala (Po)", value: 1 },
    ],
  },
  {
    id: 22,
    field: "Fireplaces",
    question: "¿Cuántas chimeneas tiene?",
    inputType: "number",
    placeholder: "Número de chimeneas",
  },
  {
    id: 23,
    field: "GarageFinish",
    question: "¿Acabado del garage?",
    options: [
      { label: "Acabado completo", value: "Fin" },
      { label: "Parcial", value: "RFn" },
      { label: "Sin acabado", value: "Unf" },
    ],
  },
  {
    id: 24,
    field: "PavedDrive",
    question: "¿Entrada pavimentada?",
    options: [
      { label: "Sí", value: "Y" },
      { label: "Parcial", value: "P" },
      { label: "No", value: "N" },
    ],
  },
  {
    id: 25,
    field: "Fence",
    question: "¿Tipo de cerca?",
    options: [
      { label: "Buena", value: "GdPrv" },
      { label: "Media", value: "MnPrv" },
      { label: "Cadena metálica", value: "GdWo" },
      { label: "Ninguna", value: "None" },
    ],
  },
  {
    id: 26,
    field: "PoolArea",
    question: "¿Área de piscina (ft²)?",
    inputType: "number",
    placeholder: "Ingresa ft²",
  },
  {
    id: 27,
    field: "MoSold",
    question: "¿En qué mes se vendió la casa por última vez?",
    inputType: "number",
    placeholder: "Mes de venta (1-12)",
  },
  {
    id: 28,
    field: "YrSold",
    question: "¿En qué año se vendió la casa por última vez?",
    inputType: "number",
    placeholder: "Año de venta",
  },
  {
    id: 29,
    field: "LotShape",
    question: "¿Forma del lote?",
    options: [
      { label: "Regular", value: "Reg" },
      { label: "Ligeramente irregular", value: "IR1" },
      { label: "Irregular", value: "IR2" },
    ],
  },
  {
    id: 30,
    field: "MasVnrType",
    question: "¿Tipo de revestimiento exterior?",
    options: [
      { label: "Ladrillo", value: "BrkFace" },
      { label: "Piedra", value: "Stone" },
      { label: "Ninguno", value: "None" },
    ],
  },
  {
    id: 31,
    field: "MasVnrArea",
    question: "Área del revestimiento exterior (ft²):",
    inputType: "number",
    placeholder: "Ingresa ft²",
  },
  {
    id: 32,
    field: "BsmtExposure",
    question: "Exposición del sótano:",
    options: [
      { label: "Ninguna", value: "No" },
      { label: "Media luz", value: "Mn" },
      { label: "Salida total", value: "Av" },
      { label: "Salida excelente", value: "Gd" },
    ],
  },
  {
    id: 33,
    field: "BsmtFullBath",
    question: "¿Cuántos baños completos hay en el sótano?",
    inputType: "number",
    placeholder: "Número de baños",
  },
  {
    id: 34,
    field: "BsmtHalfBath",
    question: "¿Cuántos baños medios hay en el sótano?",
    inputType: "number",
    placeholder: "Número de baños",
  },
  {
    id: 35,
    field: "FullBath",
    question: "¿Cuántos baños completos hay sobre el suelo?",
    inputType: "number",
    placeholder: "Número de baños",
  },
  {
    id: 36,
    field: "HalfBath",
    question: "¿Cuántos medios baños hay sobre el suelo?",
    inputType: "number",
    placeholder: "Número de medios baños",
  },
  {
    id: 37,
    field: "BedroomAbvGr",
    question: "¿Cuántas recámaras hay por encima del suelo?",
    inputType: "number",
    placeholder: "Número de recámaras",
  },
  {
    id: 38,
    field: "ScreenPorch",
    question: "¿Área de porche techado (ft²)?",
    inputType: "number",
    placeholder: "Ingresa ft²",
  },
  {
    id: 39,
    field: "EnclosedPorch",
    question: "¿Área de porche cerrado (ft²)?",
    inputType: "number",
    placeholder: "Ingresa ft²",
  },
  {
    id: 40,
    field: "OpenPorchSF",
    question: "¿Área de porche abierto (ft²)?",
    inputType: "number",
    placeholder: "Ingresa ft²",
  },
  {
    id: 41,
    field: "WoodDeckSF",
    question: "¿Área de deck de madera (ft²)?",
    inputType: "number",
    placeholder: "Ingresa ft²",
  },
  {
    id: 42,
    field: "LotConfig",
    question: "Configuración del lote:",
    options: [
      { label: "Interior", value: "Inside" },
      { label: "Esquina", value: "Corner" },
      { label: "Frente a parque", value: "FR2" },
      { label: "Frente a calle principal", value: "FR3" },
    ],
  },
  {
    id: 43,
    field: "Condition1",
    question: "Condición 1 del vecindario:",
    options: [
      { label: "Normal", value: "Norm" },
      { label: "Cerca de arteria", value: "Artery" },
      { label: "Frente a vía ferroviaria", value: "RRNn" },
    ],
  },
  {
    id: 44,
    field: "Condition2",
    question: "Condición 2 del vecindario:",
    options: [
      { label: "Normal", value: "Norm" },
      { label: "Cerca de arteria", value: "Artery" },
      { label: "Frente a vía ferroviaria", value: "RRNn" },
    ],
  },
  {
    id: 45,
    field: "Alley",
    question: "¿Tiene acceso por callejón?",
    options: [
      { label: "Sí pavimentado", value: "Pave" },
      { label: "Sí sin pavimentar", value: "Grvl" },
      { label: "No", value: "NA" },
    ],
  },
  {
  id: 46,
  field: "Fireplaces",
  question: "¿Cuántas chimeneas tiene la casa (Fireplaces)?",
  inputType: "number",
  placeholder: "Número de chimeneas"
},
{
  id: 47,
  field: "FullBath",
  question: "¿Cuántos baños completos hay en la casa (FullBath)?",
  inputType: "number",
  placeholder: "Número de baños completos"
},
{
  id: 48,
  field: "HalfBath",
  question: "¿Cuántos medios baños hay en la casa (HalfBath)?",
  inputType: "number",
  placeholder: "Número de medios baños"
},
{
  id: 49,
  field: "KitchenQual",
  question: "¿Cómo calificarías la calidad de la cocina (KitchenQual)?",
  options: [
    { label: "Excepcional (Ex)", value: 5 },
    { label: "Muy buena (Gd)", value: 4 },
    { label: "Promedio (TA)", value: 3 },
    { label: "Regular (Fa)", value: 2 },
    { label: "Mala (Po)", value: 1 },
  ],
},
{
  id: 50,
  field: "PoolArea",
  question: "¿Cuál es el área total de la alberca (PoolArea)? (ft²) Nota: Si no tiene, ingresa 0",
  inputType: "number",
  placeholder: "Área de la alberca en ft²"
}

];

export default questions;
