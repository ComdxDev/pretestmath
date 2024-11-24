  const questions = [
        { series: "1, 2, 4, __, 16", answer: 8 },  
        { series: "5, 10, 20, __, 80", answer: 40 },  
        { series: "3, 6, 12, __, 48", answer: 24 },  
        { series: "2, 3, 5, __, 11", answer: 7 },  
        { series: "1, 4, 9, __, 25", answer: 16 },  
        { series: "7, 14, 28, __, 112", answer: 56 },  
        { series: "50, 45, 40, __, 30", answer: 35 },  
        { series: "1, 1, 2, 3, __, 8", answer: 5 },  
        { series: "6, 12, 18, __, 30", answer: 24 },  
        { series: "2, 6, 18, __, 162", answer: 54 }  
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