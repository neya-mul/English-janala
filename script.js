const allLessons = () => {
    let url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => showLessons(data.data));
};





const showLessons = (allLessons) => {
    let all = document.getElementById('lessons');
    all.innerHTML = '';
    for (const lesson of allLessons) {


        let lessSection = document.createElement('div');
        lessSection.innerHTML = `
        <button id ="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary mx-auto btn-lessons"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
        `
        // lessSection.classList.add('mx-auto',)
        all.appendChild(lessSection)
    }


}
allLessons()

const removeclass = () => {
    let activeBtn = document.querySelectorAll('.btn-lessons');
    // console.log(activeBtn)





    activeBtn.forEach(btn => {
        btn.classList.remove('bg-[#422AD5]', 'text-white')

    });
}

const loadWords = (id) => {
    // console.log(id)
    let url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {


            removeclass()
            let clickedBtn = document.getElementById(`lesson-btn-${id}`)

            clickedBtn.classList.add('bg-[#422AD5]', 'text-white')
            displayWords(data.data)
        })
}

const displayWords = (word) => {
    // console.log(word)
    let words = document.getElementById('words')
    words.innerHTML = '';

    if (word.length == 0) {
        words.innerHTML = `
        
            <div class=" text-center col-span-full bangla">
                <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-3xl">নেক্সট Lesson এ যান</p>
            </div>

        `
    }
    word.forEach(element => {
        // console.log(element)
        let eachWord = document.createElement('div');

        eachWord.innerHTML = `
            <div class="card bg-white  py-13 space-y-2.5 px-10 mx-auto text-center ">
                <h3 class="font-bold">${element.word ? element.word : "word not found"}</h3>
                <p>Meaning /Pronounciation</p>
                <h1 class="text-2xl font-bold">"${element.meaning ? element.meaning : "Meaning not foune"} / ${element.pronunciation ? element.pronunciation : "pronunciation not found"}"</h1>
                  <div class="flex justify-between ">
                    <button onclick="loadWordDetails(${element.id})" class="hover:bg-blue-100 p-1 rounded-2xl"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="hover:bg-blue-100 p-1 rounded-2xl"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
    
    `

        words.append(eachWord)
    });


}


const loadWordDetails = (id) =>{
 let url = `https://openapi.programming-hero.com/api/word/${id}`
 fetch(url)
 .then(res => res.json())
 .then(data=> displayWordDetails(data.data))


}

const displayWordDetails = (word) =>{
  console.log(word)
}