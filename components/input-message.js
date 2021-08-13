const string = 'Paid Rs.66,431.44 to Spotify India LLP from Paytm Balance. Updated Balance: Paytm Wallet- Rs 5. More Details: https://paytm.me/1-omVuE'
var tableContent = [];

const processSMS = (sms) => {

    let source = ''
    if(sms.includes("@"))source="UPI"
    
    // const keywords = ["paytm","amazon pay","bank"]
    

    var amount = ''
    for( var i=0; i<sms.length;i++){
        if(i!=0){
            if(sms[i-1]=='R'&&sms[i]=='s'){
                if(sms[i+1]=='.')i+=2
                else i++

                while(sms[i]!=' '){
                    amount+=sms[i]
                    i++;
                }

                break;
            }
        }
    }
    var doublenumber = Number(amount .replace(/[^0-9\.]+/g,""));
    // console.log("debit/credit amount "+doublenumber)

    const words = sms.trim().split(" ")
    var debited=false
    
    for( var i = 0; i<words.length; i++ ) {

        const word = words[i].toLowerCase()
        // console.log(word)

        if(word.includes("debited")||word.includes("paid")||word.includes("using")||word.includes("transferred"))
            debited=true
        else{
            if(source.length==0){
                // console.log(word)
                if(word.includes("paytm"))source=words[i]
                else if(word.includes("bank"))source=words[i]
                else if(word.includes("atm"))source=words[i]
                else if(word.includes("amazon")&&words[i+1].includes("pay"))source=words[i]+words[i+1]
            }
        }

        // if(word.includes("balance")||word.includes("bal"))break;

    }

    document.write(doublenumber);
    document.write("\n    ");
    if(debited) {
        console.log("debited    ");
    }
    document.write("\n    ");
    document.write(source);

    return {
        'amount': doublenumber,
        'debited': debited==true,
        'credited': debited!=true,
        'source': source
    }

}   
 
async function handleSMS() {
    let sms = "";
    sms = document.forms["inputMessage"]["sms"].value;
    // console.log(sms);
    const result = await processSMS(sms);
    // tableContent.push(result);
    // document.write("*******************************");
    // document.write(" ");
    // for(var i = 0; i < tableContent.size(); i = i + 1) {
    //     document.write(tableContent[i].amount);
    // }
    // console.log(result);
}