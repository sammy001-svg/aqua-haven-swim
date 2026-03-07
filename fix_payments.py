import os
import re

old_card_re = re.compile(
    r'<label class="payment-option">\s*<input type="radio" name="paymentMethod" value="card">\s*<div class="payment-card">\s*<i class="fa-[a-zA-Z0-9- ]+"></i>\s*<span>Credit/Debit Card</span>\s*</div>\s*</label>',
    re.DOTALL
)

old_mpesa_re = re.compile(
    r'<div class="instruction-box">\s*<h4>M-Pesa Instructions</h4>\s*<p>1\. Go to M-Pesa Menu</p>\s*<p>2\. Select Lipa na M-Pesa -> Buy Goods and Services</p>\s*<p>3\. Enter Till Number: <strong>123456</strong></p>\s*<p>4\. Upon completion, enter your transaction code below:</p>',
    re.DOTALL
)

new_mpesa = '''<div class="instruction-box">
                            <h4>M-Pesa Instructions</h4>
                            <p>1. Go to M-Pesa Menu</p>
                            <p>2. Select Lipa na M-Pesa -> Paybill</p>
                            <p>3. Enter Business Number: <strong>880100</strong></p>
                            <p>4. Account Number: <strong>720333</strong></p>
                            <p>5. Upon completion, enter your transaction code below:</p>'''

count_changed = 0
for f in os.listdir('.'):
    if f.endswith('.html') and f != 'index.html':
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        new_content = old_card_re.sub('', content)
        new_content = old_mpesa_re.sub(new_mpesa, new_content)
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {f}")
            count_changed += 1

print(f"Total files updated: {count_changed}")
