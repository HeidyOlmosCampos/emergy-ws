const moment = require('moment');
const { GoogleGenerativeAI } = require("@google/generative-ai");


textoABitacora = async (promtEntrante) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const now = moment(); // Obtiene la fecha y hora actuales
    const fechaHoraDefecto = now.format('YYYY-MM-DD_HH:mm');

    const promtBase = "convierte el siguiente texto para una bitacora en este formato, tenienendo en cuenta que si no menciono la fecha u hora debes ponerle la fecha u hora por defecto de" + fechaHoraDefecto +", que la fecha este en formato AAAA-MM-DD, toma en cuenta que pueden haber horas en texto o numero y debes convertirlo al formato indicado, este es el formato en que quiero que me devuelvas la informacion: fecha_hora_descripcion@fecha_hora_descripcion@fecha_hora_descripcion. Estos son los datos de la bitacora";
    const promtBaseFin = "Devuelveme solo la respuesta en el formato indicado, mas nada, nada de explicaciones ni nada, ni respuesta de que esperas mas texto"

    const prompt = promtBase + " (" + promtEntrante +") " + promtBaseFin;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
      throw new Error('Error al obtener todos: ' + error.message);
  }
};

module.exports = {textoABitacora}