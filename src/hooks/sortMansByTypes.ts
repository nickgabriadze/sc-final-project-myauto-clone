import { Manufacturer } from "../components/search/searchInterfaces";

function sortMansByTypes(data: Manufacturer[]) {
    const result: { [key: string]: Manufacturer[] } = {
      'cars': [],
      'motorcycles': [],
      'tractors': [],
    };
  
    for (const eachMan of data) {
      if (eachMan.is_car === '1') {
        result['cars'].push(eachMan);
      }
      if (eachMan.is_spec === '1') {
        result['tractors'].push(eachMan);
      }
      if (eachMan.is_moto === '1') {
        result['motorcycles'].push(eachMan);
      }
    }
  
    return result;
  }

export default sortMansByTypes;