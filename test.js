// ->>>>>> http://pdu.argos.ws/LIP_PDU_Generator/LIP_PDU_Generator.htm


const PduShortLocationReport = require("./pdu/ShortLocationReport");
const shortReport = PduShortLocationReport.fromData("0123006AD00F6886E000")

console.log(shortReport.toData())