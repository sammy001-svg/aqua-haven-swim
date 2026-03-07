const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

const oldPaymentSection = `                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="card">
                            <div class="payment-card">
                                <i class="fa-solid fa-regular fa-credit-card"></i>
                                <span>Credit/Debit Card</span>
                            </div>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="cash">
                            <div class="payment-card">
                                <i class="fa-solid fa-money-bill-wave"></i>
                                <span>Pay at Facility</span>
                            </div>
                        </label>
                    </div>
                    
                    <div class="payment-instructions" id="mpesaInstructions">
                        <div class="instruction-box">
                            <h4>M-Pesa Instructions</h4>
                            <p>1. Go to M-Pesa Menu</p>
                            <p>2. Select Lipa na M-Pesa -> Buy Goods and Services</p>
                            <p>3. Enter Till Number: <strong>123456</strong></p>
                            <p>4. Upon completion, enter your transaction code below:</p>`;

const newPaymentSection = `                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="cash">
                            <div class="payment-card">
                                <i class="fa-solid fa-money-bill-wave"></i>
                                <span>Pay at Facility</span>
                            </div>
                        </label>
                    </div>
                    
                    <div class="payment-instructions" id="mpesaInstructions">
                        <div class="instruction-box">
                            <h4>M-Pesa Instructions</h4>
                            <p>1. Go to M-Pesa Menu</p>
                            <p>2. Select Lipa na M-Pesa -> Paybill</p>
                            <p>3. Enter Business Number: <strong>880100</strong></p>
                            <p>4. Account Number: <strong>720333</strong></p>
                            <p>5. Upon completion, enter your transaction code below:</p>`;

// Read all files in the directory
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach(function (file) {
        if (file.endsWith('.html') && file !== 'index.html') {
            const filePath = path.join(directoryPath, file);
            
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err) {
                    console.log('Error reading file ' + file + ': ' + err);
                    return;
                }
                
                // Replace the content
                const result = data.replace(oldPaymentSection, newPaymentSection);
                
                if (result !== data) {
                    fs.writeFile(filePath, result, 'utf8', function(err) {
                        if (err) {
                            console.log('Error writing file ' + file + ': ' + err);
                        } else {
                            console.log('Successfully updated ' + file);
                        }
                    });
                }
            });
        }
    });
});
