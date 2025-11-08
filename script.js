let btn = document.querySelectorAll('.number')
let ans = document.getElementById("ans")
let n = []
let a = 0
let op=["+","-","/","x"]
let op2=["+","-"]
let left_num = ""
let right_num = ""
let left_idx=0
let right_idx=0

let f=false

const get_nums = (o,n)=>{
    left_num = "";
    right_num = ""
    left_idx = n.indexOf(o)-1
    right_idx = n.indexOf(o)+1
    f=false
    // left no
    if (left_idx==-1) {
        left_num=0
    }
    else{
        while (!op.includes(n[left_idx]) && left_idx>=0) {
            left_num=String(n[left_idx])+left_num
            left_idx=left_idx-1
        }
    }

    // right no
    if (right_idx==n.length) {
        right_num=left_num
    }
    else{
        if (n[right_idx]=="-") {
            right_idx=right_idx+1
            f=true
        }
        while (!op.includes(n[right_idx]) && right_idx<n.length) {
            right_num=right_num+String(n[right_idx])
            right_idx=right_idx+1
        }
         if (f) right_num = "-" + right_num;
    }
}

const calc = (n)=>{

    while(n.includes("(")){
        let start = n.lastIndexOf("(");
        let end = n.indexOf(")", start);
        let sub = n.slice(start + 1, end);
        calc(sub);
        n.splice(start, end - start + 1, a);
    }

    if(n.includes("/")){
        get_nums("/",n)
        a = Number(left_num) / Number(right_num)  
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        calc(n)   
    }else if(n.includes("x")){
        get_nums("x",n)
        a = Number(left_num) * Number(right_num)        
        n.splice(left_idx+1,right_idx-left_idx-1,a) 
        console.log(n)       
        calc(n) 
    }else if(n.includes("-")){
        get_nums("-",n)
        a = Number(left_num) - Number(right_num)
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        calc(n) 
    }
    else if(n.includes("+")){
        get_nums("+",n)
        a = Number(left_num) + Number(right_num)
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        calc(n) 
    }
}

btn.forEach((b)=>{
    b.addEventListener("click",function(){
        if(b.value!="AC" && b.value!="="){            
            if(op.includes(b.value)){
                if (op2.includes(n[(n.length)-1])) {
                    n.pop()
                    n.push(b.value)
                } 
                else{
                    n.push(b.value)
                }
            }else{
                n.push(b.value)
            }
            ans.innerHTML = n.join("")
        }
        if(b.value=="AC"){
            ans.innerHTML=""
            n.length=0
        }
        if(b.value=="="){
            console.log(n)
            calc(n)
            ans.innerHTML=a
        }
    })
})