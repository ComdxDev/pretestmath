

// ข้อสอบชุดที่ 3 form gpt

const questions = [
    { series: "1, 2, 6, 24, __, 720", answer: 120 }, // แฟกทอเรียล  
    { series: "2, 6, 18, 54, __, 486", answer: 162 }, // คูณ 3  
    { series: "1, 1, 2, 6, 24, __", answer: 120 }, // แฟกทอเรียลเริ่มจาก 1  
    { series: "2, 3, 5, 7, 11, __", answer: 13 }, // จำนวนเฉพาะ  
    { series: "1, 4, 13, 40, __, 364", answer: 121 }, // คูณ 3 แล้วบวก 1  
    { series: "10, 11, 14, 19, __, 31", answer: 26 }, // เพิ่มทีละจำนวนเฉพาะ  
    { series: "81, 27, 9, 3, __, 1", answer: 1 }, // หารด้วย 3  
    { series: "1, 8, 27, 64, __, 216", answer: 125 }, // ลูกบาศก์  
    { series: "100, 81, 64, 49, __, 25", answer: 36 }, // กำลังสองถอยหลัง  
    { series: "3, 12, 48, 192, __, 3072", answer: 768 } // คูณ 4  
    
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  let correctAnswers = [];
  
  // อัปเดตคำถาม
  function loadQuestion() {
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    questionElement.textContent = questions[currentQuestion].series;
    answerInput.value = ""; // รีเซ็ตคำตอบ
  }
  
  // ตรวจสอบคำตอบ
  function checkAnswer() {
    const answerInput = document.getElementById("answer");
    const userAnswer = parseInt(answerInput.value, 10);
    const resultElement = document.getElementById("result");
    
    if (!userAnswer) {
      const pElement = document.createElement('p');
      pElement.textContent = "ไม่ใส่คำตอบ"; 
      pElement.classList.add('no-answer'); 
      resultElement.appendChild(pElement); 
  } else if (userAnswer === questions[currentQuestion].answer) {
      score++;
      correctAnswers.push({ question: questions[currentQuestion].series, answer: userAnswer });
      
      const pElement = document.createElement('p');
      pElement.textContent = "ถูกต้อง!"; 
      pElement.classList.add('correct-answer'); 
      resultElement.appendChild(pElement); 
  
  
  
    }  else {
      incorrectAnswers.push({ question: questions[currentQuestion].series, answer: userAnswer });
    
       const pElement = document.createElement('p');
       pElement.textContent = "ผิด!"; 
       pElement.classList.add('incorrect-answer'); 
       resultElement.appendChild(pElement); 
    } 
  
    // ไปยังคำถามถัดไปหรือสิ้นสุดเกม
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(() => {
        loadQuestion();
        resultElement.textContent = ""; // รีเซ็ตผลลัพธ์
      }, 1000); // ไปยังคำถามถัดไปหลังจาก 1 วินาที
    } else {
      setTimeout(endGame, 1000); // จบเกมหลังจาก 1 วินาที
    }
    
    // อัปเดตคะแนน
    document.getElementById("score").textContent = "Score: " + score;
  }
  
  // จบเกม
  function endGame() {
    alert("Game Over! Your final score is: " + score);
    document.getElementById("download-btn").style.display = 'block'; // แสดงปุ่มดาวน์โหลด
  }
  
  // สร้าง PDF
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text('Answer Key:', 20, 20);
    let y = 30;
    
    doc.text('Correct Answers:', 20, y);
    y += 10;
    correctAnswers.forEach((answer, index) => {
      doc.text(`${index + 1}. ${answer.question}`, 20, y);
      y += 10;
      doc.text(`Your Answer: ${answer.answer}`, 20, y);
      y += 10;
    });
    
    y += 10;
    doc.text('Incorrect Answers:', 20, y);
    y += 10;
    incorrectAnswers.forEach((answer, index) => {
      doc.text(`${index + 1}. ${answer.question}`, 20, y);
      y += 10;
      doc.text(`Your Answer: ${answer.answer}`, 20, y);
      y += 10;
    });
    
    doc.save('answer-key.pdf');
  }
  
  // โหลดคำถามแรกเมื่อเริ่มเกม
  loadQuestion();