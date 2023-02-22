import moment from "moment";
import { GeneralAPI } from "../Config/GeneralAPI";
import { CapitalizeWords, getLSData, multiGroupBy, setLSData } from "./GeneralFunctions";


interface ILocations {
    "ID": number;
    "NOMBRE": string;
    "DEP_ID": number;
    "DEPARTAMENTO": string;
    "PRV_ID": number;
    "PROVINCIA": string;
    "PAI_ID": number;
    "PAIS": string;
}


export const DummyLocations:ILocations[] = [
    {
        "ID": 23387,
        "NOMBRE": "ARROYO BARU",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18548,
        "NOMBRE": "ARROYO CARABALLO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17429,
        "NOMBRE": "ARROYO CONCEPCION",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18181,
        "NOMBRE": "ARROYO GRANDE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19735,
        "NOMBRE": "ARROYO PALMAR",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19347,
        "NOMBRE": "ARROYO URQUIZA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18547,
        "NOMBRE": "BARU",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19348,
        "NOMBRE": "BERDUC",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18182,
        "NOMBRE": "CALERA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19349,
        "NOMBRE": "CANTERA LA CONSTANCIA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17800,
        "NOMBRE": "CA\u00d1ADA DE LAS OVEJAS",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18549,
        "NOMBRE": "COLON",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17431,
        "NOMBRE": "COLONIA  HOCKER",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18550,
        "NOMBRE": "COLONIA AMBIS",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19350,
        "NOMBRE": "COLONIA BAILINA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18551,
        "NOMBRE": "COLONIA CARABALLO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19736,
        "NOMBRE": "COLONIA EL CARMEN",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19737,
        "NOMBRE": "COLONIA ELISA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18965,
        "NOMBRE": "COLONIA EMILIO GOUCHON",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17430,
        "NOMBRE": "COLONIA F SILLEN",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17432,
        "NOMBRE": "COLONIA HAMBIS",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19351,
        "NOMBRE": "COLONIA HUGHES",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18558,
        "NOMBRE": "COLONIA LA SUIZA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19352,
        "NOMBRE": "COLONIA LAS PEPAS",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19738,
        "NOMBRE": "COLONIA MABRAGA\u00d1A",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19353,
        "NOMBRE": "COLONIA NUEVA AL SUD",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19739,
        "NOMBRE": "COLONIA NUEVA SAN MIGUEL",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19354,
        "NOMBRE": "COLONIA PEREIRA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23767,
        "NOMBRE": "COLONIA PRIMERO DE MAYO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19355,
        "NOMBRE": "COLONIA SAENZ VALIENTE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19356,
        "NOMBRE": "COLONIA SAN ANTONIO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18183,
        "NOMBRE": "COLONIA SAN ERNESTO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18552,
        "NOMBRE": "COLONIA SAN FRANCISCO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18553,
        "NOMBRE": "COLONIA SAN IGNACIO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18184,
        "NOMBRE": "COLONIA SAN JOSE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17048,
        "NOMBRE": "COLONIA SAN MIGUEL",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19740,
        "NOMBRE": "COLONIA SANTA ELENA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17801,
        "NOMBRE": "COLONIA SANTA ROSA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18966,
        "NOMBRE": "COLONIA VAZQUEZ",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25308,
        "NOMBRE": "COLONIA VILLA ELISA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24588,
        "NOMBRE": "DISTRITO CUARTO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24107,
        "NOMBRE": "DISTRITO SEGUNDO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18974,
        "NOMBRE": "DISTRITO SEXTO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18967,
        "NOMBRE": "EJIDO COLON",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19741,
        "NOMBRE": "EL BRILLANTE-LA PICADA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17802,
        "NOMBRE": "ENRIQUE BERDUC",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18185,
        "NOMBRE": "ESTABLECIMIENTO LA CALERA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19357,
        "NOMBRE": "ESTABLECIMIENTO LOS MONIGOTES",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18554,
        "NOMBRE": "FABRICA COLON",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18186,
        "NOMBRE": "ISLA SAN JOSE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18555,
        "NOMBRE": "JUAN JORGE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17803,
        "NOMBRE": "KILOMETRO 114",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19358,
        "NOMBRE": "KILOMETRO 25",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18187,
        "NOMBRE": "KILOMETRO 305",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18556,
        "NOMBRE": "KILOMETRO 310",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17049,
        "NOMBRE": "KILOMETRO 311",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19742,
        "NOMBRE": "KILOMETRO 322",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18968,
        "NOMBRE": "KILOMETRO 324",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17804,
        "NOMBRE": "KILOMETRO 336",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17050,
        "NOMBRE": "KILOMETRO 337",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18969,
        "NOMBRE": "KILOMETRO 344",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18557,
        "NOMBRE": "KILOMETRO 353",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18188,
        "NOMBRE": "KILOMETRO 45",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18970,
        "NOMBRE": "KILOMETRO 49",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18189,
        "NOMBRE": "KILOMETRO 50",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19359,
        "NOMBRE": "KILOMETRO 56",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18971,
        "NOMBRE": "KILOMETRO 86",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18190,
        "NOMBRE": "KILOMETRO 88",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18191,
        "NOMBRE": "KILOMETRO 89",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17805,
        "NOMBRE": "KILOMETRO 99",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18192,
        "NOMBRE": "LA CARLOTA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18972,
        "NOMBRE": "LA CLARITA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19743,
        "NOMBRE": "LAS DIEZ CASAS",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17052,
        "NOMBRE": "LEICHACH O CAZES",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17806,
        "NOMBRE": "MARTINIANO LEGUIZAMON",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18559,
        "NOMBRE": "PALMAR",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17433,
        "NOMBRE": "PALMAR YATAY",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19360,
        "NOMBRE": "PARQUE NACIONAL EL PALMAR",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17051,
        "NOMBRE": "PERUCHO VERNA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18193,
        "NOMBRE": "POS POS",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23407,
        "NOMBRE": "PUEBLO CAZES",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17434,
        "NOMBRE": "PUEBLO COLORADO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19744,
        "NOMBRE": "PUEBLO LIEBIG'S",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18560,
        "NOMBRE": "PUENTE DE GUALEGUAYCHU",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17807,
        "NOMBRE": "PUERTO ALMIRON",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19745,
        "NOMBRE": "PUERTO COLORADO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18561,
        "NOMBRE": "PUNTAS DEL GUALEGUAYCHU",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18194,
        "NOMBRE": "PUNTAS DEL PALMAR",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19361,
        "NOMBRE": "SAN ANSELMO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17808,
        "NOMBRE": "SAN FRANCISCO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17053,
        "NOMBRE": "SAN GREGORIO",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17809,
        "NOMBRE": "SAN JOSE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18973,
        "NOMBRE": "SAN MIGUEL",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17810,
        "NOMBRE": "SAN MIGUEL NRO 2",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17435,
        "NOMBRE": "SAN SALVADOR",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18562,
        "NOMBRE": "SANTA INES",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19362,
        "NOMBRE": "SANTA ROSA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17436,
        "NOMBRE": "UBAJAY",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18195,
        "NOMBRE": "VILLA ELISA",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18975,
        "NOMBRE": "VILLA SAN JOSE",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18976,
        "NOMBRE": "YATAY",
        "DEP_ID": 258,
        "DEPARTAMENTO": "COLON",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14696,
        "NOMBRE": "ARROYO EL MOCHO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14301,
        "NOMBRE": "ARROYO HONDO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14697,
        "NOMBRE": "ARROYO LA VIRGEN",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15499,
        "NOMBRE": "ARROYO MOREIRA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15919,
        "NOMBRE": "AYUI PARADA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15500,
        "NOMBRE": "BENITO LEGEREN",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16295,
        "NOMBRE": "CALABACILLA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15920,
        "NOMBRE": "CAMBA PASO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15501,
        "NOMBRE": "CAMPO DOMINGUEZ",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16296,
        "NOMBRE": "CARPINCHORIS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14698,
        "NOMBRE": "CLODOMIRO LEDESMA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15502,
        "NOMBRE": "CNIA JUSTO JOSE DE URQUIZA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14699,
        "NOMBRE": "COLONIA ADELA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25288,
        "NOMBRE": "COLONIA AYUI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14700,
        "NOMBRE": "COLONIA AYUI GRANDE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15128,
        "NOMBRE": "COLONIA CAMPOS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15129,
        "NOMBRE": "COLONIA CURBELO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15130,
        "NOMBRE": "COLONIA GENERAL ROCA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15131,
        "NOMBRE": "COLONIA JORGE FINK",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15503,
        "NOMBRE": "COLONIA LA MORA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15132,
        "NOMBRE": "COLONIA LA QUINTA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14701,
        "NOMBRE": "COLONIA LOMA NEGRA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15133,
        "NOMBRE": "COLONIA LOS SAUCES",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16666,
        "NOMBRE": "COLONIA NAVARRO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16667,
        "NOMBRE": "COLONIA OFICIAL NRO 5",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16668,
        "NOMBRE": "COLONIA SAN BONIFACIO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15489,
        "NOMBRE": "COLONIA YERUA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15119,
        "NOMBRE": "CONCORDIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14689,
        "NOMBRE": "CUEVA DEL TIGRE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15120,
        "NOMBRE": "DON ROBERTO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16669,
        "NOMBRE": "EL DURAZNAL",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14290,
        "NOMBRE": "EL EMBALSADO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13864,
        "NOMBRE": "EL MARTILLO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16288,
        "NOMBRE": "EL REDOMON",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15911,
        "NOMBRE": "EL REFUGIO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16670,
        "NOMBRE": "EMBARCADERO FERRARI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22926,
        "NOMBRE": "ESTACION GRANDE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13872,
        "NOMBRE": "ESTACION LOS CHARRUAS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15124,
        "NOMBRE": "ESTACION MAGNASCO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15495,
        "NOMBRE": "ESTACION PEDERNAL",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14690,
        "NOMBRE": "ESTACION YERUA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25128,
        "NOMBRE": "ESTACION YUQUERI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22946,
        "NOMBRE": "ESTANCIA GRANDE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16671,
        "NOMBRE": "FRIGORIFICO YUQUERI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13865,
        "NOMBRE": "GENERAL CAMPOS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16672,
        "NOMBRE": "HERVIDERO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13866,
        "NOMBRE": "ISTHILART",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13867,
        "NOMBRE": "JORGE FINK",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16289,
        "NOMBRE": "JUAN B MONTI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16673,
        "NOMBRE": "KILOMETRO 11",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15490,
        "NOMBRE": "KILOMETRO 24",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14691,
        "NOMBRE": "KILOMETRO 32",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14692,
        "NOMBRE": "KILOMETRO 329",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16674,
        "NOMBRE": "KILOMETRO 33",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14291,
        "NOMBRE": "KILOMETRO 333",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14693,
        "NOMBRE": "KILOMETRO 342",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13868,
        "NOMBRE": "KILOMETRO 343",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15121,
        "NOMBRE": "KILOMETRO 344",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13869,
        "NOMBRE": "KILOMETRO 347",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16290,
        "NOMBRE": "KILOMETRO 355",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15912,
        "NOMBRE": "KILOMETRO 373",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14292,
        "NOMBRE": "KILOMETRO 376",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14694,
        "NOMBRE": "KILOMETRO 6",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14293,
        "NOMBRE": "LA ALICIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15122,
        "NOMBRE": "LA COLORADA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13870,
        "NOMBRE": "LA CRIOLLA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15913,
        "NOMBRE": "LA EMILIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16675,
        "NOMBRE": "LA GRANJA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15491,
        "NOMBRE": "LA INVERNADA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15914,
        "NOMBRE": "LA NOBLEZA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15915,
        "NOMBRE": "LA ODILIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16676,
        "NOMBRE": "LA PERLA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15123,
        "NOMBRE": "LA QUERENCIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15492,
        "NOMBRE": "LA QUINTA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16677,
        "NOMBRE": "LA ROSADA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13871,
        "NOMBRE": "LAS MOCHAS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14294,
        "NOMBRE": "LAS TEJAS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14295,
        "NOMBRE": "LESCA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16291,
        "NOMBRE": "LOMA NEGRA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16678,
        "NOMBRE": "LOS BRILLANTES",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13873,
        "NOMBRE": "LOS SAUER",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15493,
        "NOMBRE": "NUEVA ESCOCIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13874,
        "NOMBRE": "PARADA YUQUERI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15916,
        "NOMBRE": "PASO DEL GALLO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15125,
        "NOMBRE": "PASO MARGARI\u00d1OS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14296,
        "NOMBRE": "PASO SOCIEDAD",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15494,
        "NOMBRE": "PEDERMAR",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16679,
        "NOMBRE": "PUEBLO FERRE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14297,
        "NOMBRE": "PUERTO YERUA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14298,
        "NOMBRE": "PUNTAS DE MOREIRA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14299,
        "NOMBRE": "QUEBRACHO",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16680,
        "NOMBRE": "RUTA 14 KM 443",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13875,
        "NOMBRE": "SALADERO CONCORDIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16292,
        "NOMBRE": "SAN BUENAVENTURA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15496,
        "NOMBRE": "SAN JORGE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13876,
        "NOMBRE": "SAN JUAN LA QUERENCIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15126,
        "NOMBRE": "SANTA ISABEL",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15497,
        "NOMBRE": "SAUCE NORTE",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14695,
        "NOMBRE": "SUBCENTRAL SANTA MARIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16293,
        "NOMBRE": "TABLADA NORTE CONCORDIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15498,
        "NOMBRE": "TABLADA OESTE CONCORDIA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22906,
        "NOMBRE": "VILLA ADELA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15917,
        "NOMBRE": "VILLA ZORRAQUIN",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 14300,
        "NOMBRE": "VILLAMIL",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 16294,
        "NOMBRE": "WALTER MOSS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15127,
        "NOMBRE": "YAROS",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13877,
        "NOMBRE": "YERUA",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 15918,
        "NOMBRE": "YUQUERI",
        "DEP_ID": 257,
        "DEPARTAMENTO": "CONCORDIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18977,
        "NOMBRE": "ALDEA BRASILERA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24728,
        "NOMBRE": "ALDEA GRAPSCHENTAL",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18196,
        "NOMBRE": "ALDEA PROTESTANTE",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19363,
        "NOMBRE": "ALDEA SALTO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17054,
        "NOMBRE": "ALDEA SAN FRANCISCO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18978,
        "NOMBRE": "ALDEA SANTAFECINA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17811,
        "NOMBRE": "ALDEA SPATZENKUTTER",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18563,
        "NOMBRE": "ALDEA VALLE MARIA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19364,
        "NOMBRE": "CAMPO RIQUELME",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18564,
        "NOMBRE": "CARRIZAL",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17812,
        "NOMBRE": "COLEGIO ADVENTISTA DEL PLATA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18565,
        "NOMBRE": "COLONIA ENSAYO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17055,
        "NOMBRE": "COLONIA GRAPSCHENTAL",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17056,
        "NOMBRE": "COLONIA PALMAR",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19746,
        "NOMBRE": "COLONIA RIVAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19365,
        "NOMBRE": "COSTA GRANDE",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17813,
        "NOMBRE": "COSTA GRANDE DOLL",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18566,
        "NOMBRE": "DIAMANTE",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17057,
        "NOMBRE": "DOCTOR GARCIA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17058,
        "NOMBRE": "ESCUELA ALBERDI",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17437,
        "NOMBRE": "ESTABLECIMIENTO EL CARMEN",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18979,
        "NOMBRE": "ESTABLECIMIENTO LA ESPERANZA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17438,
        "NOMBRE": "ESTABLECIMIENTO LAS MARGARITAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23967,
        "NOMBRE": "ESTACION CAMPS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18980,
        "NOMBRE": "GENERAL ALVEAR",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19366,
        "NOMBRE": "GENERAL RAMIREZ",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23268,
        "NOMBRE": "ISLETAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17059,
        "NOMBRE": "KILOMETRO 43",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23187,
        "NOMBRE": "LA JAULA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17814,
        "NOMBRE": "LAS CUEVAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19747,
        "NOMBRE": "LIBERTADOR SAN MARTIN",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18981,
        "NOMBRE": "LOS BURGOS APEADERO FCGU",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17815,
        "NOMBRE": "PAJA BRAVA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18197,
        "NOMBRE": "POLICIA EGIDO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19748,
        "NOMBRE": "PUEBLO GENERAL BELGRANO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19749,
        "NOMBRE": "PUENTE DE LAS PENCAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17439,
        "NOMBRE": "PUENTE DEL DOLL",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18567,
        "NOMBRE": "PUERTO DIAMANTE",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17440,
        "NOMBRE": "PUERTO LAS CUEVAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18982,
        "NOMBRE": "RACEDO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18983,
        "NOMBRE": "RAMIREZ",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17816,
        "NOMBRE": "RIVAS",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18568,
        "NOMBRE": "SAN FRANCISCO",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19367,
        "NOMBRE": "SANATORIO ADVENTISTA DEL PLATA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19750,
        "NOMBRE": "SANATORIO APEADERO FCGU",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19751,
        "NOMBRE": "STROBEL",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18569,
        "NOMBRE": "VALLE MARIA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19368,
        "NOMBRE": "VILLA AIDA",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18984,
        "NOMBRE": "VILLA LIBERTADOR SAN MARTIN",
        "DEP_ID": 256,
        "DEPARTAMENTO": "DIAMANTE",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11214,
        "NOMBRE": "ALBARI\u00d1O",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24568,
        "NOMBRE": "ARRUABARRENA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11970,
        "NOMBRE": "BELLA UNION PARAJE",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11215,
        "NOMBRE": "BIZCOCHO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13472,
        "NOMBRE": "CABI MONDA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12753,
        "NOMBRE": "CHAJARI",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13473,
        "NOMBRE": "CHAVIYU COLONIA FLORES",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11216,
        "NOMBRE": "CHAVIYU PARADA FCGU",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11217,
        "NOMBRE": "COLONIA  ARGENTINA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13099,
        "NOMBRE": "COLONIA ALEMANA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24288,
        "NOMBRE": "COLONIA AYLMAN",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12754,
        "NOMBRE": "COLONIA BELGRANO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12755,
        "NOMBRE": "COLONIA BIZCOCHO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11619,
        "NOMBRE": "COLONIA DON BOSCO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13474,
        "NOMBRE": "COLONIA ENSANCHE ",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23347,
        "NOMBRE": "COLONIA ENSANCHE SAUCE",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11971,
        "NOMBRE": "COLONIA FLORES",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12756,
        "NOMBRE": "COLONIA FRAZER",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11620,
        "NOMBRE": "COLONIA FREITAS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13100,
        "NOMBRE": "COLONIA GUALEGUAYCITO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10818,
        "NOMBRE": "COLONIA LA GLORIA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11621,
        "NOMBRE": "COLONIA LA MATILDE SANTA ANA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11622,
        "NOMBRE": "COLONIA LA PAZ",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11623,
        "NOMBRE": "COLONIA LAMARCA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11218,
        "NOMBRE": "COLONIA OFICIAL N\u00ba 1 LA FLORIDA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11219,
        "NOMBRE": "COLONIA SANTA ELOISA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12757,
        "NOMBRE": "COLONIA SANTA ELVIRA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13475,
        "NOMBRE": "COLONIA SANTA JUANA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24548,
        "NOMBRE": "COLONIA SANTA MARIA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13102,
        "NOMBRE": "COLONIA SAUCE",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 26408,
        "NOMBRE": "COLONIA TUNAS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13476,
        "NOMBRE": "COLONIA VILLA LIBERTAD",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10819,
        "NOMBRE": "COOPERATIVA GRAL SAN MARTIN",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12758,
        "NOMBRE": "CUATRO BOCAS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12759,
        "NOMBRE": "DISTRITO GUALEGUAYCITO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11220,
        "NOMBRE": "ESTACION SANTA ANA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10820,
        "NOMBRE": "ESTANCIA LA FLORESTA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13477,
        "NOMBRE": "ESTANCIA SALINAS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13103,
        "NOMBRE": "ESTANCIA SAN JOSE",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10821,
        "NOMBRE": "FEDERACION",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10822,
        "NOMBRE": "FLORIDA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10823,
        "NOMBRE": "FORTUNA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13104,
        "NOMBRE": "FRONTERAS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11221,
        "NOMBRE": "GUAYAQUIL",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13478,
        "NOMBRE": "KILOMETRO 37",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11624,
        "NOMBRE": "KILOMETRO 44",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12351,
        "NOMBRE": "KILOMETRO 47",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10824,
        "NOMBRE": "KILOMETRO 51",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12760,
        "NOMBRE": "KILOMETRO 84",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13479,
        "NOMBRE": "LA ARGENTINA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13105,
        "NOMBRE": "LA BLANQUEADA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11972,
        "NOMBRE": "LA CALERA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13106,
        "NOMBRE": "LA SELVA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11625,
        "NOMBRE": "LA SOLEDAD",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13480,
        "NOMBRE": "LAMARCA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13481,
        "NOMBRE": "LAS CATORCE",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12761,
        "NOMBRE": "LAS PE\u00d1AS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10825,
        "NOMBRE": "LOMAS BLANCAS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10826,
        "NOMBRE": "LOS CONQUISTADORES",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10827,
        "NOMBRE": "LOS PARAISOS",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12352,
        "NOMBRE": "MANDISOVI",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11626,
        "NOMBRE": "MONTE CHICO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12762,
        "NOMBRE": "MONTE VERDE",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11222,
        "NOMBRE": "NUEVA VIZCAYA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11223,
        "NOMBRE": "PUERTO ALGARROBO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12350,
        "NOMBRE": "RACEDO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12763,
        "NOMBRE": "SAN JAIME",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12353,
        "NOMBRE": "SAN JAIME DE LA FRONTERA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11973,
        "NOMBRE": "SAN PEDRO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13101,
        "NOMBRE": "SAN RAMON",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10828,
        "NOMBRE": "SANTA ANA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11974,
        "NOMBRE": "SANTA JUANA",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11975,
        "NOMBRE": "SARANDI",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12764,
        "NOMBRE": "SURST",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12765,
        "NOMBRE": "VILLA DEL ROSARIO",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 26008,
        "NOMBRE": "VILLA LIBERTAD",
        "DEP_ID": 255,
        "DEPARTAMENTO": "FEDERACION",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 8316,
        "NOMBRE": "ARROYO DEL MEDIO",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23167,
        "NOMBRE": "COLONIA DE FEDERAL",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10402,
        "NOMBRE": "COLONIA FALCO",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10403,
        "NOMBRE": "CONSCRIPTO BERNARDI",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 7477,
        "NOMBRE": "DISTRITO BANDERAS",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 9146,
        "NOMBRE": "DISTRITO CHA\u00d1AR",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23667,
        "NOMBRE": "DISTRITO DIEGO LOPEZ",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 7876,
        "NOMBRE": "EL CIMARRON",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 7877,
        "NOMBRE": "EL GRAMILLAL",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 8317,
        "NOMBRE": "EL PAGO APEADERO FCGU",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 9147,
        "NOMBRE": "FEDERAL",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 7478,
        "NOMBRE": "LAS ACHIRAS",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23270,
        "NOMBRE": "LOMA LIMPIA",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23066,
        "NOMBRE": "NUEVA VIZCAYA",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 8725,
        "NOMBRE": "SAUCE DE LUNA",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10404,
        "NOMBRE": "TTE PRIMERO BRIGIO CAINZO",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 9979,
        "NOMBRE": "VILLA PERPER",
        "DEP_ID": 254,
        "DEPARTAMENTO": "FEDERAL",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 744,
        "NOMBRE": "CATALOTTI",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1082,
        "NOMBRE": "CHIRCALITO",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 397,
        "NOMBRE": "COLONIA LA MATILDE",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2066,
        "NOMBRE": "CORREA",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2065,
        "NOMBRE": "DISTRITO ATENCIO",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2430,
        "NOMBRE": "DISTRITO CHA\u00d1AR",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22966,
        "NOMBRE": "DISTRITO MANANTIALES",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 398,
        "NOMBRE": "LA ESMERALDA",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 66,
        "NOMBRE": "LA HIERRA",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1414,
        "NOMBRE": "LA VERBENA",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 745,
        "NOMBRE": "LAS LAGUNAS",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1746,
        "NOMBRE": "LAS MULITAS",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 746,
        "NOMBRE": "MAC KELLER",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 67,
        "NOMBRE": "MESA",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23273,
        "NOMBRE": "MULAS GRANDES",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 399,
        "NOMBRE": "PAJAS BLANCAS",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 747,
        "NOMBRE": "PALO A PIQUE",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23006,
        "NOMBRE": "PARAJE  LA LIBERTAD",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 748,
        "NOMBRE": "SAN JOSE DE FELICIANO",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1415,
        "NOMBRE": "SAN LUIS SAN JOSE FELICIANO",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1416,
        "NOMBRE": "SAN VICTOR",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 68,
        "NOMBRE": "TASES",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 400,
        "NOMBRE": "VIBORAS",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 69,
        "NOMBRE": "VILLA PORTE\u00d1A",
        "DEP_ID": 253,
        "DEPARTAMENTO": "FELICIANO",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22968,
        "NOMBRE": "6\u00ba DISTRITO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21877,
        "NOMBRE": "ALBARDON",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22562,
        "NOMBRE": "ALDEA ASUNCION",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21147,
        "NOMBRE": "ARROYO CLE DESVIO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20451,
        "NOMBRE": "BOCA GUALEGUAY",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21148,
        "NOMBRE": "BUENA VISTA PARAJE",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22563,
        "NOMBRE": "CHACRAS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20109,
        "NOMBRE": "COSTA DEL NOGOYA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 26288,
        "NOMBRE": "CUARTO DISTRITO CL\u00c9",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21878,
        "NOMBRE": "CUATRO BOCAS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22564,
        "NOMBRE": "CUATRO MANOS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22219,
        "NOMBRE": "CUCHILLA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20112,
        "NOMBRE": "DISTRITO 1RO.",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 26308,
        "NOMBRE": "DISTRITO CUARTO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22566,
        "NOMBRE": "DISTRITO QUINTO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20775,
        "NOMBRE": "DISTRITO SEPTIMO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25208,
        "NOMBRE": "DISTRITO SEXTO COSTA DE NOGOYA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21149,
        "NOMBRE": "EL GUALEGUAY",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21150,
        "NOMBRE": "EL REMANCE",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22222,
        "NOMBRE": "ESTACION LAZO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20110,
        "NOMBRE": "GENERAL GALARZA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21504,
        "NOMBRE": "GONZALEZ CALDERON",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20773,
        "NOMBRE": "GUALEGUAY",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21879,
        "NOMBRE": "GUALEYAN",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21505,
        "NOMBRE": "HOJAS ANCHAS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20111,
        "NOMBRE": "ISLAS LECHIGUANA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21880,
        "NOMBRE": "KILOMETRO 290",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21881,
        "NOMBRE": "KILOMETRO 303",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22220,
        "NOMBRE": "KILOMETRO 306",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22565,
        "NOMBRE": "LAS BATEAS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22221,
        "NOMBRE": "LAS COLAS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22223,
        "NOMBRE": "PUENTE PELLEGRINI",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20774,
        "NOMBRE": "PUERTA DE CRESPO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21882,
        "NOMBRE": "PUERTO BARRILES",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21151,
        "NOMBRE": "PUERTO RUIZ",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20452,
        "NOMBRE": "PUNTA DEL MONTE",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21506,
        "NOMBRE": "RINCON DEL NOGOYA SUR",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21883,
        "NOMBRE": "SALADERO ALZUA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20453,
        "NOMBRE": "SALADERO SAN JOSE",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20113,
        "NOMBRE": "SAN JULIAN",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20114,
        "NOMBRE": "SANTA MARTA",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20454,
        "NOMBRE": "SEXTO DISTRITO",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20776,
        "NOMBRE": "TRES BOCAS",
        "DEP_ID": 252,
        "DEPARTAMENTO": "GUALEGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4449,
        "NOMBRE": "AERO CLUB CANAL",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2743,
        "NOMBRE": "ALDEA SAN ANTONIO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3575,
        "NOMBRE": "ALDEA SAN JUAN",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3862,
        "NOMBRE": "ALDEA SANTA CELIA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22864,
        "NOMBRE": "ALMADA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3303,
        "NOMBRE": "ARROYO BALTAZAR",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3863,
        "NOMBRE": "ARROYO BALTAZAR CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4165,
        "NOMBRE": "ARROYO BICHO FEO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2744,
        "NOMBRE": "ARROYO BOCA FALSA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3304,
        "NOMBRE": "ARROYO BRASILERO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2745,
        "NOMBRE": "ARROYO BRAVO GUTIERREZ",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3864,
        "NOMBRE": "ARROYO BRAZO CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3305,
        "NOMBRE": "ARROYO BRAZO DE LA TINTA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4450,
        "NOMBRE": "ARROYO BUEN PASTOR",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4166,
        "NOMBRE": "ARROYO CABALLO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3306,
        "NOMBRE": "ARROYO CARBON",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3865,
        "NOMBRE": "ARROYO CARBONCITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3039,
        "NOMBRE": "ARROYO CARPINCHO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4167,
        "NOMBRE": "ARROYO CEIBITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3307,
        "NOMBRE": "ARROYO CORRENTOSO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2746,
        "NOMBRE": "ARROYO CUCHARAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3308,
        "NOMBRE": "ARROYO CUZCO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4451,
        "NOMBRE": "ARROYO DE LA ROSA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3577,
        "NOMBRE": "ARROYO DESAGUADERO DEL GUTIERR",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3309,
        "NOMBRE": "ARROYO DESAGUADERO DEL SAUCE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3578,
        "NOMBRE": "ARROYO GARCETE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3040,
        "NOMBRE": "ARROYO GUTIERREZ CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3866,
        "NOMBRE": "ARROYO IBICUYCITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3041,
        "NOMBRE": "ARROYO LA PACIENCIA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3310,
        "NOMBRE": "ARROYO LA TINTA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4168,
        "NOMBRE": "ARROYO LARA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3579,
        "NOMBRE": "ARROYO LAS ANIMAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3867,
        "NOMBRE": "ARROYO LLORONES",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3311,
        "NOMBRE": "ARROYO LOS PLATOS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3580,
        "NOMBRE": "ARROYO MALAMBO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4744,
        "NOMBRE": "ARROYO MANZANO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4452,
        "NOMBRE": "ARROYO MERLO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3868,
        "NOMBRE": "ARROYO MOSQUITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4745,
        "NOMBRE": "ARROYO NEGRO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3581,
        "NOMBRE": "ARROYO PACIENCIA CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2747,
        "NOMBRE": "ARROYO PACIENCIA GRANDE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4169,
        "NOMBRE": "ARROYO PELADO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3312,
        "NOMBRE": "ARROYO PERDIDO CEIBO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4453,
        "NOMBRE": "ARROYO PERDIDO MOSQUITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3042,
        "NOMBRE": "ARROYO PEREYRA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2748,
        "NOMBRE": "ARROYO PIEDRAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3313,
        "NOMBRE": "ARROYO PITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2749,
        "NOMBRE": "ARROYO PLATITOS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3582,
        "NOMBRE": "ARROYO PRINCIPAL",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4454,
        "NOMBRE": "ARROYO SAGASTUME CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3043,
        "NOMBRE": "ARROYO SALADO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3314,
        "NOMBRE": "ARROYO SANCHEZ CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3869,
        "NOMBRE": "ARROYO SANCHEZ GRANDE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3583,
        "NOMBRE": "ARROYO SANTOS CHICO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3044,
        "NOMBRE": "ARROYO SANTOS GRANDE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4746,
        "NOMBRE": "ARROYO TIROLES",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4747,
        "NOMBRE": "ARROYO VENERATO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4455,
        "NOMBRE": "ARROYO ZAPALLO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2750,
        "NOMBRE": "ARROYO \u00d1ANCAY",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3315,
        "NOMBRE": "BERISSO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3870,
        "NOMBRE": "BERISSO DESVIO FCGU",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2751,
        "NOMBRE": "BRAZO LARGO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3584,
        "NOMBRE": "BRITOS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3585,
        "NOMBRE": "CANAL NUEVO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4748,
        "NOMBRE": "CANAL PRINCIPAL",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3045,
        "NOMBRE": "CANAL SAN MARTIN",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4170,
        "NOMBRE": "CEIBAL",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4749,
        "NOMBRE": "CEIBAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4750,
        "NOMBRE": "COLONIA DELTA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4171,
        "NOMBRE": "COLONIA EL POTRERO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3586,
        "NOMBRE": "COLONIA GDOR BASAVILBASO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4751,
        "NOMBRE": "COLONIA ITALIANA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4752,
        "NOMBRE": "COLONIA STAUWER",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4456,
        "NOMBRE": "COOPERATIVA BRAZO LARGO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2753,
        "NOMBRE": "COSTA SAN ANTONIO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2752,
        "NOMBRE": "COSTA URUGUAY",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23267,
        "NOMBRE": "COSTA URUGUAY NORTE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23647,
        "NOMBRE": "COSTA URUGUAY SUR",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4172,
        "NOMBRE": "CUATRO BOCAS PARAJE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3316,
        "NOMBRE": "CUCHILLA REDONDA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2742,
        "NOMBRE": "DISTRITO ALARCON",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3327,
        "NOMBRE": "DISTRITO TALITAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3046,
        "NOMBRE": "DOCTOR EUGENIO MU\u00d1OZ",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4457,
        "NOMBRE": "DOS HERMANAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4173,
        "NOMBRE": "EL NUEVO RINCON",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3317,
        "NOMBRE": "EL SARANDI",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3318,
        "NOMBRE": "EL SAUCE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2754,
        "NOMBRE": "EMPALME HOLT",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4458,
        "NOMBRE": "ENRIQUE CARBO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3319,
        "NOMBRE": "ESCRI\u00d1A",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3576,
        "NOMBRE": "EST. ARROYO DEL CURA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4174,
        "NOMBRE": "ESTABLECIMIENTO SAN MARTIN",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3047,
        "NOMBRE": "FEBRE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3320,
        "NOMBRE": "GENERAL ALMADA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3871,
        "NOMBRE": "GILBERT",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3587,
        "NOMBRE": "GUALEGUAYCHU",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3048,
        "NOMBRE": "HOLT",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3872,
        "NOMBRE": "IRAZUSTA ",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3873,
        "NOMBRE": "ISLA DEL IBICUY",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4176,
        "NOMBRE": "ISLA EL DORADO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4753,
        "NOMBRE": "KILOMETRO 311",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2755,
        "NOMBRE": "KILOMETRO 340",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3049,
        "NOMBRE": "KILOMETRO 361",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4754,
        "NOMBRE": "KILOMETRO 389",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3321,
        "NOMBRE": "LA CALERA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3588,
        "NOMBRE": "LA CAPILLA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4177,
        "NOMBRE": "LA CHICA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3874,
        "NOMBRE": "LA CHILENA CANAL",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2756,
        "NOMBRE": "LA COSTA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3050,
        "NOMBRE": "LA CUADRA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4178,
        "NOMBRE": "LA ESCONDIDA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3875,
        "NOMBRE": "LA FLORIDA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3322,
        "NOMBRE": "LA LATA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3876,
        "NOMBRE": "LARROQUE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3877,
        "NOMBRE": "LAS MASITAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2757,
        "NOMBRE": "LAS MERCEDES",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4459,
        "NOMBRE": "LOBOS ARROYO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3051,
        "NOMBRE": "LOS AMIGOS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3052,
        "NOMBRE": "LUCIENVILLE 1",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3589,
        "NOMBRE": "LUCIENVILLE 2",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3053,
        "NOMBRE": "LUCIENVILLE 3",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3054,
        "NOMBRE": "LUCIENVILLE 4",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2758,
        "NOMBRE": "MAZARUCA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2759,
        "NOMBRE": "PALAVECINO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4179,
        "NOMBRE": "PARAJE PALAVEROI",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2760,
        "NOMBRE": "PARANA BRAVO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4175,
        "NOMBRE": "PARERA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4460,
        "NOMBRE": "PASAJE TALAVERA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4755,
        "NOMBRE": "PASO DEL CISNERO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2761,
        "NOMBRE": "PASTOR BRITOS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3055,
        "NOMBRE": "PEHUAJO NORTE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3590,
        "NOMBRE": "PEHUAJO SUD",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3323,
        "NOMBRE": "PERDICES",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3878,
        "NOMBRE": "PESQUERIA DIAMANTINO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23046,
        "NOMBRE": "PUEBLO BELGRANO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4461,
        "NOMBRE": "PUEBLO NUEVO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3591,
        "NOMBRE": "PUENTE PARANACITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4180,
        "NOMBRE": "PUENTE \u00d1ANCAY",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3056,
        "NOMBRE": "PUERTO PERAZZO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2762,
        "NOMBRE": "PUERTO SAN JUAN",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2763,
        "NOMBRE": "PUERTO UNZUE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4462,
        "NOMBRE": "RINCON DE CINTO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4463,
        "NOMBRE": "RINCON DEL GATO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3879,
        "NOMBRE": "RIO AGUILA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3324,
        "NOMBRE": "RIO ALFEREZ NELSON PAGE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3325,
        "NOMBRE": "RIO CEIBO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3057,
        "NOMBRE": "RIO PARANA GUAZU",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4756,
        "NOMBRE": "RIO PARANACITO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3058,
        "NOMBRE": "RIO PASAJE AL AGUILA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2764,
        "NOMBRE": "RIO SAUCE",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3326,
        "NOMBRE": "RIO TALAVERA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2765,
        "NOMBRE": "SAGASTUME",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4464,
        "NOMBRE": "SAN ANTONIO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4465,
        "NOMBRE": "SARANDI",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2766,
        "NOMBRE": "SAUCE RIO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3592,
        "NOMBRE": "TRES ESQUINAS",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4757,
        "NOMBRE": "URDINARRAIN",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3593,
        "NOMBRE": "VILLA ANTONY",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2767,
        "NOMBRE": "VILLA DEL CERRO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3594,
        "NOMBRE": "VILLA ELEONORA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3595,
        "NOMBRE": "VILLA FAUSTINO M PARERA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3880,
        "NOMBRE": "VILLA LILA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4466,
        "NOMBRE": "VILLA ROMERO",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 3881,
        "NOMBRE": "ZANJA LA CHILENA",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22947,
        "NOMBRE": "ZONA RURAL DE ALARCON",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 4758,
        "NOMBRE": "\u00d1ANDUBAYSAL",
        "DEP_ID": 251,
        "DEPARTAMENTO": "GUALEGUAYCHU",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1083,
        "NOMBRE": "ANAHI",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24207,
        "NOMBRE": "ARROYO BRAZO LARGO",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2067,
        "NOMBRE": "ARROYO MARTINEZ",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 70,
        "NOMBRE": "ARROYO SAGASTUME GRANDE",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22977,
        "NOMBRE": "CEIBAS",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2068,
        "NOMBRE": "EL EMPALME PARAJE",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 401,
        "NOMBRE": "FERNANDEZ",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22978,
        "NOMBRE": "HOLT IBICUY",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1084,
        "NOMBRE": "IBICUY",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1417,
        "NOMBRE": "LIBERTADOR GRAL SAN MARTIN",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23106,
        "NOMBRE": "MAZARUCA",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2431,
        "NOMBRE": "MEDANOS",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 402,
        "NOMBRE": "PARANACITO",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1747,
        "NOMBRE": "PUERTO CONSTANZA",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1748,
        "NOMBRE": "PUERTO IBICUY",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2069,
        "NOMBRE": "VILLA PARANACITO",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23367,
        "NOMBRE": "\u00d1ANCAY",
        "DEP_ID": 250,
        "DEPARTAMENTO": "ISLAS DEL IBICUY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13490,
        "NOMBRE": "ALCARACITO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12361,
        "NOMBRE": "ALCARAZ  SEGUNDO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11981,
        "NOMBRE": "ALCARAZ NORTE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11980,
        "NOMBRE": "ALCARAZ PRIMERO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13491,
        "NOMBRE": "ALCARAZ PUEBLO ARRUA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10835,
        "NOMBRE": "ALCARAZ SUD",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13109,
        "NOMBRE": "ARROYO CEIBO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11629,
        "NOMBRE": "ARROYO HONDO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13110,
        "NOMBRE": "BA\u00d1ADERO OFICIAL LAS GALARZAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13111,
        "NOMBRE": "BONALDI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13112,
        "NOMBRE": "BOVRIL ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13113,
        "NOMBRE": "CALANDRIA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12770,
        "NOMBRE": "CENTENARIO LA PAZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12362,
        "NOMBRE": "CENTENARIO PARANA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10836,
        "NOMBRE": "COLONIA ALCARCITO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13114,
        "NOMBRE": "COLONIA AVIGDOR (LA LOMA)",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24908,
        "NOMBRE": "COLONIA BERTOZZI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13492,
        "NOMBRE": "COLONIA BUENA VISTA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12363,
        "NOMBRE": "COLONIA CARRASCO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12771,
        "NOMBRE": "COLONIA FONTANINI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11229,
        "NOMBRE": "COLONIA LA DELIA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12364,
        "NOMBRE": "COLONIA LA PROVIDENCIA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13493,
        "NOMBRE": "COLONIA LAS GAMAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13494,
        "NOMBRE": "COLONIA MAXIMO CASTRO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11982,
        "NOMBRE": "COLONIA OFICIAL N 11",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11983,
        "NOMBRE": "COLONIA OFICIAL N 13",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13115,
        "NOMBRE": "COLONIA OFICIAL N 14",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12772,
        "NOMBRE": "COLONIA OFICIAL N 3",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10837,
        "NOMBRE": "COLONIA OUGRIE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11230,
        "NOMBRE": "COLONIA VIRARO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10838,
        "NOMBRE": "CURUZU CHALI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13116,
        "NOMBRE": "DON GONZALO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13495,
        "NOMBRE": "EJIDO SUD",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12365,
        "NOMBRE": "EL CARMEN",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13117,
        "NOMBRE": "EL COLORADO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11630,
        "NOMBRE": "EL CORCOVADO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10839,
        "NOMBRE": "EL DIECISIETE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11984,
        "NOMBRE": "EL GAUCHO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13496,
        "NOMBRE": "EL QUEBRACHO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12366,
        "NOMBRE": "EL ROSARIO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12367,
        "NOMBRE": "EL SOLAR",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10840,
        "NOMBRE": "ESTACAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12773,
        "NOMBRE": "ESTACION ALCARAZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12774,
        "NOMBRE": "ESTANCIA SAN JUAN",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11985,
        "NOMBRE": "FLORESTA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11231,
        "NOMBRE": "GONZALEZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12775,
        "NOMBRE": "ISLA CURUZU CHALI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13497,
        "NOMBRE": "ISLA LA PAZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11631,
        "NOMBRE": "ISLAS ALCARAZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12368,
        "NOMBRE": "LA DILIGENCIA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12354,
        "NOMBRE": "LA PAZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13482,
        "NOMBRE": "LAS LAGUNAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10829,
        "NOMBRE": "LAS TOSCAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13483,
        "NOMBRE": "MANANTIALES",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10830,
        "NOMBRE": "MARTINETTI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11976,
        "NOMBRE": "MIRA MONTE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11224,
        "NOMBRE": "MONTIEL",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11977,
        "NOMBRE": "OMBUES",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10831,
        "NOMBRE": "PASO GARIBALDI",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12766,
        "NOMBRE": "PASO MEDINA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12767,
        "NOMBRE": "PASO POTRILLO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12355,
        "NOMBRE": "PASO PUERTO AUGUSTO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10832,
        "NOMBRE": "PASO TELEGRAFO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23274,
        "NOMBRE": "PICADA BERON",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12356,
        "NOMBRE": "PIEDRAS BLANCAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12357,
        "NOMBRE": "PILOTO AVILA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13484,
        "NOMBRE": "PRIMER CONGRESO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11225,
        "NOMBRE": "PUEBLO ELLISON",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11627,
        "NOMBRE": "PUERTO ALGARROBO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13107,
        "NOMBRE": "PUERTO CADENAS",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13485,
        "NOMBRE": "PUERTO LA ESMERALDA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12768,
        "NOMBRE": "PUERTO MARQUEZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12358,
        "NOMBRE": "PUERTO YUNQUE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10833,
        "NOMBRE": "SAN ANTONIO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11226,
        "NOMBRE": "SAN GERONIMO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11227,
        "NOMBRE": "SAN GUSTAVO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11978,
        "NOMBRE": "SAN JUAN",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13108,
        "NOMBRE": "SAN RAMIREZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12769,
        "NOMBRE": "SANTA ELENA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12359,
        "NOMBRE": "SANTA INES",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10834,
        "NOMBRE": "SANTA MARIA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13486,
        "NOMBRE": "SARANDI-CORA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13487,
        "NOMBRE": "SIR LEONARD",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23287,
        "NOMBRE": "TACUARAS OMBU",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13488,
        "NOMBRE": "TACUARAS YACARE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23147,
        "NOMBRE": "VILLA ALCARAZ",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11628,
        "NOMBRE": "VILLA BOREILO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12360,
        "NOMBRE": "VIZCACHERA",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13489,
        "NOMBRE": "YACARE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11979,
        "NOMBRE": "YESO",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11228,
        "NOMBRE": "YESO OESTE",
        "DEP_ID": 249,
        "DEPARTAMENTO": "LA PAZ",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17060,
        "NOMBRE": "20 DE SETIEMBRE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17061,
        "NOMBRE": "ALDEA SAN MIGUEL",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17442,
        "NOMBRE": "ALGARROBITOS",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17443,
        "NOMBRE": "ALMIRANTE IGLESIAS",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17441,
        "NOMBRE": "ARANGUREN",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18985,
        "NOMBRE": "ARANGUREN",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19752,
        "NOMBRE": "BETBEDER OV. MATILDE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17817,
        "NOMBRE": "BOCA DEL TIGRE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17818,
        "NOMBRE": "CAMPO ESCALES",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18570,
        "NOMBRE": "CAMPS",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18986,
        "NOMBRE": "CHIQUEROS",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17062,
        "NOMBRE": "COLONIA ALGARRABITOS",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17819,
        "NOMBRE": "COLONIA LA LLAVE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19753,
        "NOMBRE": "CRUCECITA OCTAVA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17444,
        "NOMBRE": "CRUCECITA TERCERA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19369,
        "NOMBRE": "CRUCECITAS 7A SECCION",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17820,
        "NOMBRE": "CRUCECITAS URQUIZA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24768,
        "NOMBRE": "CRUCESITAS S\u00c9PTIMA ",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25928,
        "NOMBRE": "CRUCESITAS TERCERA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19754,
        "NOMBRE": "CUARTO DISTRITO",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18571,
        "NOMBRE": "DIST. DON CRISTOBAL",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18198,
        "NOMBRE": "DISTRITO EL PUEBLITO",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17821,
        "NOMBRE": "DISTRITO EL SAUCE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18202,
        "NOMBRE": "DISTRITO LAURENCENA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19755,
        "NOMBRE": "DON CRISTOBAL 1RA SECCION",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18572,
        "NOMBRE": "DON CRISTOBAL 2da SECCION",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18199,
        "NOMBRE": "EL TALLER",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18987,
        "NOMBRE": "EL TROPEZON",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18988,
        "NOMBRE": "GOBERNADOR FEBRE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22969,
        "NOMBRE": "HERNANDEZ",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18200,
        "NOMBRE": "KILOMETRO 148",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19756,
        "NOMBRE": "LA COLINA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18989,
        "NOMBRE": "LA CORVINA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18201,
        "NOMBRE": "LA FAVORITA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18573,
        "NOMBRE": "LA FLORENCIA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19370,
        "NOMBRE": "LA ILUCION",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19371,
        "NOMBRE": "LA LLAVE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17445,
        "NOMBRE": "LA LOMA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17064,
        "NOMBRE": "LA MARUJA A",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19372,
        "NOMBRE": "LOS PARAISOS",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17446,
        "NOMBRE": "LUCAS GONZALEZ",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18203,
        "NOMBRE": "LUCAS NORESTE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19373,
        "NOMBRE": "MONTOYA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19757,
        "NOMBRE": "NOGOYA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17822,
        "NOMBRE": "PUEBLITO",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18990,
        "NOMBRE": "SAN LORENZO",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18574,
        "NOMBRE": "SAUCE",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 19758,
        "NOMBRE": "SECCION URQUIZA",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17447,
        "NOMBRE": "SEPTIMO DISTRITO",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 17063,
        "NOMBRE": "VILLA HERNANDEZ",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 18991,
        "NOMBRE": "VILLA TRES DE FEBRERO",
        "DEP_ID": 248,
        "DEPARTAMENTO": "NOGOYA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11232,
        "NOMBRE": "ALCETE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11986,
        "NOMBRE": "ALDEA CHALECO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10841,
        "NOMBRE": "ALDEA CUESTA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12369,
        "NOMBRE": "ALDEA EIGENFELD",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10842,
        "NOMBRE": "ALDEA MARIA LUISA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13498,
        "NOMBRE": "ALDEA SAN JOSE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13118,
        "NOMBRE": "ALDEA SAN RAFAEL",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11233,
        "NOMBRE": "ALDEA SANTA MARIA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12371,
        "NOMBRE": "ALDEA SANTA ROSA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13119,
        "NOMBRE": "ALMACEN CRISTIAN SCHUBERT",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11234,
        "NOMBRE": "ANTONIO TOMAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12372,
        "NOMBRE": "ANTONIO TOMAS SUD",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13120,
        "NOMBRE": "ARROYO BURGOS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13121,
        "NOMBRE": "ARROYO LAS TUNAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11632,
        "NOMBRE": "ARROYO MARIA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13499,
        "NOMBRE": "ARROYO PANCHO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13122,
        "NOMBRE": "AVENIDA EJERCITO PARANA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11987,
        "NOMBRE": "BARRANCAS COLORADAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10843,
        "NOMBRE": "BA\u00d1ADERO OFICIAL BURGOS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13123,
        "NOMBRE": "BOCA DEL TIGRE APEADERO FCGU",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11633,
        "NOMBRE": "CAMINO A DIAMANTE KM 1",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10844,
        "NOMBRE": "CA\u00d1ADA GRANDE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10845,
        "NOMBRE": "CENTRO COMUNITARIO CNIA NUE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12373,
        "NOMBRE": "CERRITO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12374,
        "NOMBRE": "CHA\u00d1AR MARIA GRANDE PRIMERA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12375,
        "NOMBRE": "COLONIA ARGENTINA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23327,
        "NOMBRE": "COLONIA AVELLANEDA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12376,
        "NOMBRE": "COLONIA CELINA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12777,
        "NOMBRE": "COLONIA CENTENARIO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12377,
        "NOMBRE": "COLONIA CRESPO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11988,
        "NOMBRE": "COLONIA HERNANDARIAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10846,
        "NOMBRE": "COLONIA HIGUERA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13500,
        "NOMBRE": "COLONIA LA GAMA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13124,
        "NOMBRE": "COLONIA MARIA LUISA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12370,
        "NOMBRE": "COLONIA MEROU",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12778,
        "NOMBRE": "COLONIA NUEVA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13501,
        "NOMBRE": "COLONIA OFICIAL N 4",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13502,
        "NOMBRE": "COLONIA REFFINO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11989,
        "NOMBRE": "COLONIA RIVADAVIA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13503,
        "NOMBRE": "COLONIA SAN JUAN",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11634,
        "NOMBRE": "COLONIA SAN MARTIN",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11635,
        "NOMBRE": "COLONIA SANTA LUISA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12779,
        "NOMBRE": "CORRALES NUEVOS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11235,
        "NOMBRE": "CRESPO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12780,
        "NOMBRE": "CRESPO NORTE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12378,
        "NOMBRE": "CURTIEMBRE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11990,
        "NOMBRE": "DESTACAMENTO GENERAL GUEMES",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13504,
        "NOMBRE": "DISTRITO ESPINILLO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11236,
        "NOMBRE": "DISTRITO TALA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11991,
        "NOMBRE": "EL PALENQUE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10847,
        "NOMBRE": "EL PINGO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11992,
        "NOMBRE": "EL RAMBLON",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12781,
        "NOMBRE": "ESPINILLO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25768,
        "NOMBRE": "ESPINILLO NORTE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13505,
        "NOMBRE": "ESTABLECIMIENTO EL CIMARRON",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13125,
        "NOMBRE": "ESTABLECIMIENTO EL TALA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23007,
        "NOMBRE": "ESTACION PARERA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11993,
        "NOMBRE": "ESTANCIA LA GAMA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13126,
        "NOMBRE": "GENERAL RACEDO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12379,
        "NOMBRE": "HASENKAMP",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13506,
        "NOMBRE": "HERNANDARIAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11636,
        "NOMBRE": "ISLA LYNCH",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13127,
        "NOMBRE": "KILOMETRO 116",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13507,
        "NOMBRE": "KILOMETRO 131",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12782,
        "NOMBRE": "KILOMETRO 147",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12783,
        "NOMBRE": "KILOMETRO 28",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11237,
        "NOMBRE": "KILOMETRO 45",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12784,
        "NOMBRE": "LA BALSA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13508,
        "NOMBRE": "LA BALSA PARANA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11637,
        "NOMBRE": "LA COLMENA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11994,
        "NOMBRE": "LA JULIANA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13509,
        "NOMBRE": "LA PICADA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12380,
        "NOMBRE": "LA PICADA NORTE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13128,
        "NOMBRE": "LA VIRGINIA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13129,
        "NOMBRE": "LAS GARZAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10848,
        "NOMBRE": "LAS TUNAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12381,
        "NOMBRE": "LOS NARANJOS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13130,
        "NOMBRE": "MARIA GRANDE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11995,
        "NOMBRE": "MARIA GRANDE PRIMERA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11638,
        "NOMBRE": "MARIA GRANDE SEGUNDA SUR",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11639,
        "NOMBRE": "MORENO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10849,
        "NOMBRE": "ORO VERDE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12382,
        "NOMBRE": "PARANA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13132,
        "NOMBRE": "PASO DE LA ARENA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12785,
        "NOMBRE": "PASO DE LA BALZA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11238,
        "NOMBRE": "PASO DE LAS PIEDRAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11640,
        "NOMBRE": "PRESIDENTE AVELLANEDA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10850,
        "NOMBRE": "PUEBLO BELLOCQ",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12383,
        "NOMBRE": "PUEBLO BRUGO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12384,
        "NOMBRE": "PUEBLO GENERAL PAZ",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13510,
        "NOMBRE": "PUEBLO MORENO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12385,
        "NOMBRE": "PUENTE CARMONA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11239,
        "NOMBRE": "PUENTE DEL CHA\u00d1AR",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11240,
        "NOMBRE": "PUERTO CURTIEMBRE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12786,
        "NOMBRE": "PUERTO VIBORAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12386,
        "NOMBRE": "PUERTO VIEJO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13511,
        "NOMBRE": "PUERTO VILLARRUEL",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11241,
        "NOMBRE": "QUEBRACHO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12787,
        "NOMBRE": "QUINTAS AL SUD",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12788,
        "NOMBRE": "RAMBLON",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13512,
        "NOMBRE": "RAMON A PARERA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13133,
        "NOMBRE": "RUTA 138 KILOMETRO 1",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12387,
        "NOMBRE": "SAN BENITO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13513,
        "NOMBRE": "SAN MARTIN",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12388,
        "NOMBRE": "SANTA LUISA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13514,
        "NOMBRE": "SANTA SARA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10851,
        "NOMBRE": "SAUCE MONTRULL",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11996,
        "NOMBRE": "SAUCE PINTO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10852,
        "NOMBRE": "SEGUI",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11997,
        "NOMBRE": "SOLA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11641,
        "NOMBRE": "SOSA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12789,
        "NOMBRE": "TABOSSI",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12389,
        "NOMBRE": "TALITAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13515,
        "NOMBRE": "TEZANOS PINTO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13134,
        "NOMBRE": "TIRO FEDERAL",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11242,
        "NOMBRE": "TRES LAGUNAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 13135,
        "NOMBRE": "VIALE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11243,
        "NOMBRE": "VILLA FONTANA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11244,
        "NOMBRE": "VILLA GOB LUIS ETCHEVEHERE",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12790,
        "NOMBRE": "VILLA HERNANDARIAS",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 12791,
        "NOMBRE": "VILLA SARMIENTO",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 10853,
        "NOMBRE": "VILLA URANGA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 11998,
        "NOMBRE": "VILLA URQUIZA",
        "DEP_ID": 247,
        "DEPARTAMENTO": "PARANA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22967,
        "NOMBRE": "GENERAL CAMPOS",
        "DEP_ID": 516,
        "DEPARTAMENTO": "SAN SALVADOR",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22905,
        "NOMBRE": "SAN SALVADOR",
        "DEP_ID": 516,
        "DEPARTAMENTO": "SAN SALVADOR",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21152,
        "NOMBRE": "ALTAMIRANO NORTE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21507,
        "NOMBRE": "ALTAMIRANO SUR",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24349,
        "NOMBRE": "ARROYO CLE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20115,
        "NOMBRE": "ARROYO OBISPO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20455,
        "NOMBRE": "COLONIA DUPORTAL",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21508,
        "NOMBRE": "CUATRO BOCAS",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21156,
        "NOMBRE": "DISTRITO 1ER CUARTEL",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20120,
        "NOMBRE": "DISTRITO 2DO CUARTEL",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22567,
        "NOMBRE": "DURAZNO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21510,
        "NOMBRE": "EL CHAJA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20456,
        "NOMBRE": "ESTABLECIMIENTO SAN EDUARDO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20777,
        "NOMBRE": "ESTABLECIMIENTO SAN EUSEBIO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20116,
        "NOMBRE": "ESTABLECIMIENTO SAN FRANCISCO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21509,
        "NOMBRE": "ESTACION ECHAGUE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20117,
        "NOMBRE": "ESTACION SOLA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21153,
        "NOMBRE": "GOBERNADOR ECHAGUE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22224,
        "NOMBRE": "GOBERNADOR MANSILLA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21154,
        "NOMBRE": "GOBERNADOR SOLA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20118,
        "NOMBRE": "GUARDAMONTE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22568,
        "NOMBRE": "HIPODROMO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21511,
        "NOMBRE": "KILOMETRO 180",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21884,
        "NOMBRE": "KILOMETRO 183",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20119,
        "NOMBRE": "KILOMETRO 189",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21512,
        "NOMBRE": "KILOMETRO 192",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22225,
        "NOMBRE": "KILOMETRO 200",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21885,
        "NOMBRE": "KILOMETRO 220",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22226,
        "NOMBRE": "LA OLLITA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20457,
        "NOMBRE": "LAS GAUCHAS",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20778,
        "NOMBRE": "MACIA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21155,
        "NOMBRE": "MOLINO BOB",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21886,
        "NOMBRE": "PUENTE OBISPO",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22569,
        "NOMBRE": "RAICES AL NORTE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20779,
        "NOMBRE": "RINCON DE LAS GUACHAS",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22570,
        "NOMBRE": "ROSARIO DEL TALA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21513,
        "NOMBRE": "SAUCE NORTE",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20458,
        "NOMBRE": "SAUCE SUD",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21887,
        "NOMBRE": "SOLA",
        "DEP_ID": 246,
        "DEPARTAMENTO": "TALA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21514,
        "NOMBRE": "1 DE MAYO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20781,
        "NOMBRE": "1\u00b0 DE MAYO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21888,
        "NOMBRE": "ACHIRAS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20121,
        "NOMBRE": "ALBERTO GERCHUNOFF",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20122,
        "NOMBRE": "ARROYO MOLINO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21889,
        "NOMBRE": "BALNEARIO PELAY",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20780,
        "NOMBRE": "BASAVILBASO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20459,
        "NOMBRE": "CARAGUATA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20460,
        "NOMBRE": "CASEROS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22571,
        "NOMBRE": "CENTELLA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20782,
        "NOMBRE": "COLONIA 5 ENSANCHE DE MAYO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21515,
        "NOMBRE": "COLONIA ARROYO URQUIZA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21890,
        "NOMBRE": "COLONIA BELGA AMERICANA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20783,
        "NOMBRE": "COLONIA CARMELO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 25068,
        "NOMBRE": "COLONIA CASEROS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20784,
        "NOMBRE": "COLONIA CRUCESITAS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20461,
        "NOMBRE": "COLONIA CUPALEN",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 24348,
        "NOMBRE": "COLONIA EL PANTANOSO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22227,
        "NOMBRE": "COLONIA ELIA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21891,
        "NOMBRE": "COLONIA ELISA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22228,
        "NOMBRE": "COLONIA ENSANCHE MAYO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21157,
        "NOMBRE": "COLONIA GRAL URQUIZA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21892,
        "NOMBRE": "COLONIA LEVEN",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 26228,
        "NOMBRE": "COLONIA LOS CEIBOS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20462,
        "NOMBRE": "COLONIA LUCA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22572,
        "NOMBRE": "COLONIA LUCIENVILLE",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21893,
        "NOMBRE": "COLONIA LUCRECIA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20785,
        "NOMBRE": "COLONIA N 1",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20786,
        "NOMBRE": "COLONIA N 2",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21516,
        "NOMBRE": "COLONIA N 3",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20123,
        "NOMBRE": "COLONIA N 4",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22229,
        "NOMBRE": "COLONIA NUEVA MONTEVIDEO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20787,
        "NOMBRE": "COLONIA OFICIAL N 6",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21894,
        "NOMBRE": "COLONIA PERFECCION",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20788,
        "NOMBRE": "COLONIA SAGASTUME",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22573,
        "NOMBRE": "COLONIA SAN ANTONIO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22574,
        "NOMBRE": "COLONIA SAN CIPRIANO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21158,
        "NOMBRE": "COLONIA SAN JORGE",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 26028,
        "NOMBRE": "COLONIA SAN RAMON",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20124,
        "NOMBRE": "COLONIA SANTA ANA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21895,
        "NOMBRE": "COLONIA SANTA TERESITA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22230,
        "NOMBRE": "COLONIA TRES DE FEBRERO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22231,
        "NOMBRE": "COLONIA UBAJAY",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20789,
        "NOMBRE": "CONCEPCION DEL URUGUAY",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20125,
        "NOMBRE": "CUPALEN",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21517,
        "NOMBRE": "EL POTRERO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20126,
        "NOMBRE": "ESTACION URQUIZA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20127,
        "NOMBRE": "ESTACION URUGUAY",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22232,
        "NOMBRE": "ESTANCIA BELLA VISTA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21518,
        "NOMBRE": "ESTANCIA CNIA LA PRIMAVERA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20790,
        "NOMBRE": "ESTANCIA CNIA SANTA ELENA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21519,
        "NOMBRE": "ESTANCIA CNIA STA TERESA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20791,
        "NOMBRE": "ESTANCIA COLONIA EL OMBU",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21896,
        "NOMBRE": "ESTANCIA COLONIA EL TOROPI",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20792,
        "NOMBRE": "ESTANCIA COLONIA LA TAPERA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21159,
        "NOMBRE": "ESTANCIA COLONIA PERIBEBUY",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20463,
        "NOMBRE": "ESTANCIA COLONIA SAN PEDRO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20793,
        "NOMBRE": "ESTANCIA COLONIA SANTA ELOISA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21520,
        "NOMBRE": "ESTANCIA COLONIA SANTA JUANA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20128,
        "NOMBRE": "ESTANCIA EL TOROPI",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20794,
        "NOMBRE": "ESTANCIA LOS VASCOS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21521,
        "NOMBRE": "GENACITO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21522,
        "NOMBRE": "GERIBEBUY",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20795,
        "NOMBRE": "GOBERNADOR URQUIZA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20796,
        "NOMBRE": "GRUPO ACHIRAS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22233,
        "NOMBRE": "GRUPO PARRERO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20801,
        "NOMBRE": "HERRERA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20464,
        "NOMBRE": "KILOMETRO 108",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22235,
        "NOMBRE": "KILOMETRO 112",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21160,
        "NOMBRE": "KILOMETRO 115",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20129,
        "NOMBRE": "KILOMETRO 208",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22236,
        "NOMBRE": "KILOMETRO 231",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20797,
        "NOMBRE": "KILOMETRO 242",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21897,
        "NOMBRE": "KILOMETRO 244",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21898,
        "NOMBRE": "KILOMETRO 253",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21161,
        "NOMBRE": "KILOMETRO 268",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21523,
        "NOMBRE": "KILOMETRO 270",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21162,
        "NOMBRE": "KILOMETRO 283",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20798,
        "NOMBRE": "KILOMETRO 293",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20465,
        "NOMBRE": "LA AMIGUITA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22237,
        "NOMBRE": "LA BARRACA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21899,
        "NOMBRE": "LA GOYA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21900,
        "NOMBRE": "LA MARIA LUISA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20130,
        "NOMBRE": "LA SESTEADA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21901,
        "NOMBRE": "LA TIGRESA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21902,
        "NOMBRE": "LA ZELMIRA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21524,
        "NOMBRE": "LAS MERCEDES",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22238,
        "NOMBRE": "LAS MOSCAS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20799,
        "NOMBRE": "LAS ROSAS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21163,
        "NOMBRE": "LIBAROS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21903,
        "NOMBRE": "LIEBIG",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20466,
        "NOMBRE": "LINEA 19",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22239,
        "NOMBRE": "LINEA 20",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22240,
        "NOMBRE": "LINEA 24",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21904,
        "NOMBRE": "LINEA 25",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20800,
        "NOMBRE": "LIONEL",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23272,
        "NOMBRE": "LOS CEIBOS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21525,
        "NOMBRE": "MAC DOUGALL",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20131,
        "NOMBRE": "MANGRULLO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20467,
        "NOMBRE": "NOVIBUCO PRIMERO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21905,
        "NOMBRE": "PALACIO SAN JOSE",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22241,
        "NOMBRE": "PASO DEL MOLINO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20802,
        "NOMBRE": "PRONUNCIAMIENTO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20132,
        "NOMBRE": "PUEBLO NUEVO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20468,
        "NOMBRE": "PUERTO CAMPINCHUELO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20133,
        "NOMBRE": "PUERTO VIEJO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20803,
        "NOMBRE": "ROCAMORA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21166,
        "NOMBRE": "ROCAMORA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20804,
        "NOMBRE": "SAGASTUME",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20805,
        "NOMBRE": "SAN CIPRIANO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22575,
        "NOMBRE": "SAN JUSTO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22234,
        "NOMBRE": "SAN JUSTO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21164,
        "NOMBRE": "SAN JUSTO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20471,
        "NOMBRE": "SAN MARCIAL",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20469,
        "NOMBRE": "SAN MARTIN",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22242,
        "NOMBRE": "SAN MIGUEL",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21165,
        "NOMBRE": "SANTA ANITA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21906,
        "NOMBRE": "SANTA ROSA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20470,
        "NOMBRE": "TALITA",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20806,
        "NOMBRE": "TRES ALDEAS",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20134,
        "NOMBRE": "VILLA MANTERO",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22576,
        "NOMBRE": "VILLA UDINE",
        "DEP_ID": 245,
        "DEPARTAMENTO": "URUGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23307,
        "NOMBRE": " CHILCAS SUD",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20807,
        "NOMBRE": "ANTELO",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22577,
        "NOMBRE": "ARROYO JACINTO",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20808,
        "NOMBRE": "COLONIA ANGELA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20472,
        "NOMBRE": "DISTRITO CHILCAS ",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23247,
        "NOMBRE": "DISTRITO CORRALES",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 22243,
        "NOMBRE": "DISTRITO HINOJAL",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20474,
        "NOMBRE": "DISTRITO MONTOYA ",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21908,
        "NOMBRE": "DISTRITO PAJONAL",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21907,
        "NOMBRE": "ESTABLECIMIENTO PUNTA ALTA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23227,
        "NOMBRE": "GOBERNADOR ANTRELO",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21526,
        "NOMBRE": "ISLA EL PILLO",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21167,
        "NOMBRE": "KILMETRO 165",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20809,
        "NOMBRE": "LAGUNA DEL PESCADO",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20135,
        "NOMBRE": "LOS GANSOS",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20473,
        "NOMBRE": "MOLINO DOLL",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21909,
        "NOMBRE": "PASO DEL ABRA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20810,
        "NOMBRE": "PUEBLITO NORTE",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20475,
        "NOMBRE": "PUENTE VICTORIA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20476,
        "NOMBRE": "PUERTO ESQUINA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21910,
        "NOMBRE": "PUERTO LOPEZ",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21911,
        "NOMBRE": "QUEBRACHITO",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21912,
        "NOMBRE": "QUINTO CUARTEL",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21528,
        "NOMBRE": "RINCON DEL DOLL",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21527,
        "NOMBRE": "RINCON DEL NOGOYA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20136,
        "NOMBRE": "TRES ESQUINAS",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 21168,
        "NOMBRE": "VICTORIA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20811,
        "NOMBRE": "VILLA ANGELICA",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 20137,
        "NOMBRE": "VILLA LIBERTAD",
        "DEP_ID": 244,
        "DEPARTAMENTO": "VICTORIA",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1418,
        "NOMBRE": "ALDEA SAN GREGORIO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2432,
        "NOMBRE": "ALDEA SAN JORGE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 403,
        "NOMBRE": "BARON HIRSCH",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2433,
        "NOMBRE": "BELEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1419,
        "NOMBRE": "BENITEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1085,
        "NOMBRE": "CAMPO DE VILLAMIL",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 749,
        "NOMBRE": "CAMPO MORENO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 750,
        "NOMBRE": "CLARA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 71,
        "NOMBRE": "COLONIA ACHIRAS",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1420,
        "NOMBRE": "COLONIA BARON HIRSCH",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 751,
        "NOMBRE": "COLONIA BELEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 404,
        "NOMBRE": "COLONIA BERRO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1749,
        "NOMBRE": "COLONIA CARLOS CALVO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2070,
        "NOMBRE": "COLONIA CARMEL",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1750,
        "NOMBRE": "COLONIA EGIDO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 752,
        "NOMBRE": "COLONIA ESPINDOLA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 405,
        "NOMBRE": "COLONIA FEIMBERG",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1751,
        "NOMBRE": "COLONIA GUIBURG",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 753,
        "NOMBRE": "COLONIA HEBREA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 406,
        "NOMBRE": "COLONIA IDA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2434,
        "NOMBRE": "COLONIA LA ARMONIA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2435,
        "NOMBRE": "COLONIA LA BLANQUITA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2436,
        "NOMBRE": "COLONIA LA ESPERANZA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1086,
        "NOMBRE": "COLONIA LA MORA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 754,
        "NOMBRE": "COLONIA LA MORENITA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 72,
        "NOMBRE": "COLONIA LA PAMPA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 73,
        "NOMBRE": "COLONIA LA ROSADA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2071,
        "NOMBRE": "COLONIA LOPEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1087,
        "NOMBRE": "COLONIA MIGUEL",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1752,
        "NOMBRE": "COLONIA NUEVA ALEMANIA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 74,
        "NOMBRE": "COLONIA PERLIZA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 755,
        "NOMBRE": "COLONIA SAN JORGE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2072,
        "NOMBRE": "COLONIA SAN MANUEL",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 407,
        "NOMBRE": "COLONIA SANDOVAL",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 75,
        "NOMBRE": "COLONIA SONENFELD",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 408,
        "NOMBRE": "COLONIA VELEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1421,
        "NOMBRE": "COLONIA VILLAGUAYCITO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1088,
        "NOMBRE": "COSTA DEL PAYTICU",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2437,
        "NOMBRE": "CURUPI",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2438,
        "NOMBRE": "DESPARRAMADOS",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2073,
        "NOMBRE": "EBEN HOROSCHA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1089,
        "NOMBRE": "EL AVESTRUZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1090,
        "NOMBRE": "EMPALME NEILD",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 76,
        "NOMBRE": "INGENIERO SAJAROFF",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 77,
        "NOMBRE": "JUBILEO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2439,
        "NOMBRE": "KILOMETRO 160",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 756,
        "NOMBRE": "KILOMETRO 279",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2074,
        "NOMBRE": "KILOMETRO 284",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2075,
        "NOMBRE": "KILOMETRO 285",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 409,
        "NOMBRE": "KILOMETRO 288",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 78,
        "NOMBRE": "KILOMETRO 306",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2076,
        "NOMBRE": "KILOMETRO 325",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 757,
        "NOMBRE": "LA ENCIERRA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2440,
        "NOMBRE": "LA ESTRELLA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1422,
        "NOMBRE": "LA JOYA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1753,
        "NOMBRE": "LA PAMPA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1423,
        "NOMBRE": "LAGUNA LARGA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 410,
        "NOMBRE": "LAS PAJITAS",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2441,
        "NOMBRE": "LOS OMBUES",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2077,
        "NOMBRE": "LUCAS NORTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 411,
        "NOMBRE": "LUCAS SUD",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1425,
        "NOMBRE": "LUCAS SUD SEGUNDA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1091,
        "NOMBRE": "MAURICIO RIBOLE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 758,
        "NOMBRE": "MIGUEL J PERLIZA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23428,
        "NOMBRE": "MOJONES NORTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2078,
        "NOMBRE": "MOJONES NORTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 79,
        "NOMBRE": "MOJONES SUD PRIMERO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2079,
        "NOMBRE": "MOJONES SUD SEGUNDO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 23427,
        "NOMBRE": "MOJONES SUR",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2080,
        "NOMBRE": "PARAJE GUAYABO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2081,
        "NOMBRE": "PASO DE LA LAGUNA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 759,
        "NOMBRE": "PASO DE LA LEGUA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 760,
        "NOMBRE": "PUEBLO DOMINGUEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 761,
        "NOMBRE": "PUENTE DE LUCAS",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 762,
        "NOMBRE": "RACHEL",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 763,
        "NOMBRE": "RAICES",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 80,
        "NOMBRE": "RAICES  ESTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 764,
        "NOMBRE": "RAICES OESTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2442,
        "NOMBRE": "RINCON DE MOJONES",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1092,
        "NOMBRE": "RINCON LUCAS NORTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 412,
        "NOMBRE": "RINCON LUCAS SUD",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2443,
        "NOMBRE": "ROSPINA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1424,
        "NOMBRE": "SAN VICENTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1426,
        "NOMBRE": "SPINDOLA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 413,
        "NOMBRE": "VERGARA NORTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 2444,
        "NOMBRE": "VILLA CLARA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1427,
        "NOMBRE": "VILLA DOMINGUEZ",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 1754,
        "NOMBRE": "VILLAGUAY",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 414,
        "NOMBRE": "VILLAGUAY ESTE",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 81,
        "NOMBRE": "VILLAGUAYCITO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 765,
        "NOMBRE": "VIRANO",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 82,
        "NOMBRE": "ZENON ROCA",
        "DEP_ID": 243,
        "DEPARTAMENTO": "VILLAGUAY",
        "PRV_ID": 10,
        "PROVINCIA": "ENTRE RIOS",
        "PAI_ID": 1,
        "PAIS": "ARGENTINA"
    },
    {
        "ID": 8434243242,
        "NOMBRE": "ZENON ROCAdawd",
        "DEP_ID": 243434234,
        "DEPARTAMENTO": "VILLAGUAYdadadw",
        "PRV_ID": 14234240,
        "PROVINCIA": "ENTRE RIOSdadad",
        "PAI_ID": 2,
        "PAIS": "BRASIL"
    }
]

interface ILocalidad {
    Localidad: string;
    LocalidadID: number;
}

interface IDepartamento {
    Departamento: string;
    DepartamentoID: number;
    Localidades: ILocalidad[]
}

interface IProvincia {
    Provincia: string;
    ProvinciaID: number;
    Departamentos: IDepartamento[]
}

interface IPais {
    Pais: string;
    PaisID: number;
    Provincias: IProvincia[]
}






const AxiosAPI = new GeneralAPI();

export const LocationFullPath = (location:ILocations) => CapitalizeWords(location.NOMBRE+', '+location.DEPARTAMENTO)
export const LocationByID = (locations:ILocations[], localityID:number) => locations?.filter((location:ILocations)=>location.ID==localityID)[0]


export const RawLocations = async () => {
    const CurrentLocations:{ Locations: ILocations[]; expiration: Date; } = getLSData('Locations');
    if(CurrentLocations){
        let remainingTime = (Date.parse(moment(CurrentLocations.expiration).toString())- Date.now())/(1000*60*60*24)
        if( remainingTime > 0 ){
            return CurrentLocations.Locations;
        }
    }
    const NewLocations = await AxiosAPI.Locations();
    setLSData('Locations',{Locations: NewLocations.data, expiration: moment(Date.now()).add(1, 'days').toDate()})

    return NewLocations.data;
}

export const LocationsFullPath = (locations:ILocations[]) => locations.map((item:ILocations)=>LocationFullPath(item))

export const GroupLocations = (locations:ILocations[]) => multiGroupBy(locations, ["PAIS", "PROVINCIA", "DEPARTAMENTO", "NOMBRE"]);
