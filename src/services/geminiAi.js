const moment = require('moment');
const { GoogleGenerativeAI } = require("@google/generative-ai");


textoABitacora = async (promtEntrante) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const now = moment(); // Obtiene la fecha y hora actuales
    const fechaDefecto = now.format('YYYY-MM-DD');
    const horaDefecto = now.format('HH:mm');

    const promtBase = "convierte el siguiente texto par una bitacora en este formato, tenienendo en cuenta que si no menciono la fecha debes ponerle por defecto la fecha de hoy " + fechaDefecto + " y si no menciono la hora, que sea por defecto las " + horaDefecto +", que la fecha este en formato AAAA-MM-DD, este es el formato en que quiero que me devuelvas la informacion: fecha_hora_descripcion@fecha_hora_descripcion@fecha_hora_descripcion. Estos son los datos de la bitacora";
    const promtBaseFin = "Devuelveme solo la respuesta en el formato indicado, mas nada, nada de explicaiones ni nada, ni respuesta de que esperas mas texto"

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