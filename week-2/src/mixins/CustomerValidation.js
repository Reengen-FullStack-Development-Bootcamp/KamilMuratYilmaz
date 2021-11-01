import { required, minLength, minValue, email } from 'vuelidate/lib/validators'
// Turkish ID Check
const idCheck = (id) => {
  if(!id) return false;
  id = Array.from(id).map(id=>Number(id)); // id changed to Number with a new array
  const length = id.length; // ID length has to be 11 number, It will checked in if loop
  // Due to Wikipedia (7*check1 + 9check2) = %10  should be equal to 10th number of ID
  const check1 = id[0] + id[2] + id[4] + id[6] + id[8];
  const check2 = id[1] + id[3] + id[5] + id[7];
  let checkValid = ((7*check1 + 9*check2)%10);
  // Due to Wikipedia (7*check1 + 9check2) = %10  should be equal to 10th number of ID
  let totalOfFirst10 = id.slice(0,10);
  totalOfFirst10 = totalOfFirst10.reduce((start, end) => start + end)  % 10;

  if(
    id[0] != 0 &&
    length == 11 &&
    checkValid == id[9] &&
    totalOfFirst10  == id[10]
    ) return true;
  else return false;
}
// Hes Code Validation
const hesCode = (hes) => {
  let code =  /^[A-Z0-9]{4}-[A-Z0-9]{4}-[0-9]{2}$/g;
  if (
    hes.match(code)
    ) return true;
  else return false;
}

// international Code + Country Code + Area Code + Subscriber Number = 13
const telCheck = (tel) => {
  if(!tel) return false;
  let deletedCountryCode = tel.slice(3); // international Code + Country Code == "+" "90" = 3 that's why we slice from 3
  if (deletedCountryCode.length ==10) return true
  else return false
}

export const customerValidation = {

  data() {
    return {
      name: '',
      age: null,
      gender: null,
      email: null,
      turkishID: null,
      hesCode: '',
      tel: "+90",
    }
  },
  validations: {
        name: {
          required,
          minLength: minLength(4)
        },
        age: {
          required,
          minValue: minValue(6)
        },

        gender: {

        },

        email: {
          required,
          email

        },

        turkishID: {
          required,
          idCheck

        },
      // HES Code used for covid health status check
        hesCode: {
          required,
          hesCode

        },

        tel: {
          required,
          telCheck

        }
      },
}