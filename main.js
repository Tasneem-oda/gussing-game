const alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const button_area = document.querySelector('.buttons');
let written_letters = [];
function get_alphabet(){
  alphabets.forEach(alphabet=>{
    let button_element = document.createElement('button');
    button_element.textContent = alphabet;
    button_area.appendChild(button_element);
    button_element.addEventListener('click', function(){
    word_area.innerHTML += button_element.innerHTML
    written_letters.push(button_element.innerHTML)
    let array1 = written_letters;
    let array2 = gameData[randon_number].word.split('');
    function arraysAreEqual(array1,array2){
      if(array1.length!=array2.length){
        return false;
      }
      for(let i = 0 ; i<array1.length;i++){
        if(array1[i] !==array2[i]){
          return false;
        }
      }
      return true;
    }
    if(arraysAreEqual(array1, array2)){
      window.alert('you win !!!')
      location.reload();
    }else{
      if(array1.length>10){
        window.alert('you lost >> try again')
        location.reload();
      }
    }
    })
    
  })
}
get_alphabet();

const gameData = [
  {
    word:'html',
    hint:'web lnguage'
  },
  {
    word:'css',
    hint:'styling lnguage'
  },
  {
    word:'js',
    hint:'scripting lnguage'
  },
  {
    word:'php',
    hint:'server side lnguage'
  },
  {
    word:'mysql',
    hint:'related to database'
  },
  {
    word:'vanillajs',
    hint:'means js without libraris'
  },
  {
    word:'apachi',
    hint:'name of server'
  }
];
const hint_area = document.querySelector('.category');
const word_area = document.querySelector('.word')
const randon_number = Math.floor(Math.random()*gameData.length);
hint_area.innerHTML = gameData[randon_number].hint