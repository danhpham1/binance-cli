import axios from "axios";

export async function getTickets(option) {
    const HOST = "https://api.binance.com/";
    try {
        if(option.symbol) {
            const url = `${HOST}api/v3/ticker/price?symbol=${option.symbol.toUpperCase()}`;
            const result = await axios.get(url);
            return result.data;
        } 
        if(option.symbols){
            let strQuery = `"${option.symbols}"`;
            strQuery = strQuery.replaceAll(",",'","');
            const query = encodeURIComponent(`[${strQuery.toUpperCase()}]`);
            const url = `${HOST}api/v3/ticker/price?symbols=${query}`;
            const result = await axios.get(url);
            return result.data;
        }
        if (option.full) {
            const url = `${HOST}api/v3/ticker/price`;
            const result = await axios.get(url);
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getPerpetualTickets(option) {
    const HOST = "https://fapi.binance.com/";
    try {
        if(option.symbol) {
            const url = `${HOST}fapi/v1/ticker/price?symbol=${option.symbol.toUpperCase()}`;
            const result = await axios.get(url);
            return result.data;
        } 
        if(option.symbols){
            let strQuery = `"${option.symbols}"`;
            strQuery = strQuery.replaceAll(",",'","');
            const query = encodeURIComponent(`[${strQuery.toUpperCase()}]`);
            const url = `${HOST}fapi/v1/ticker/price?symbols=${query}`;
            const result = await axios.get(url);
            return result.data;
        }
        if (option.full) {
            const url = `${HOST}fapi/v1/ticker/price`;
            const result = await axios.get(url);
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}


