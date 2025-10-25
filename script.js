let btn = document.querySelectorAll('.number')
let ans = document.getElementById("ans")
let n = []
let a = 0
let op=["+","-","/","x"]
let left_num = ""
let right_num = ""
let left_idx=0
let right_idx=0

const get_nums = (o)=>{
    left_num = "";
    right_num = ""
    left_idx = n.indexOf(o)-1
    right_idx = n.indexOf(o)+1
    if (left_idx==-1) {
        left_num=0
    }
    else{

        while (!op.includes(n[left_idx]) && left_idx>=0) {
            left_num=n[left_idx]+left_num
            left_idx=left_idx-1
        }
    }
    if (right_idx==n.length) {
        right_num=left_num
    }
    else{

        while (!op.includes(n[right_idx]) && right_idx<n.length) {
            right_num=right_num+n[right_idx]
            right_idx=right_idx+1
        }
    }
    // console.log(left_num)
    // console.log(right_num)
}

const calc = (n)=>{   
    if(n.includes("/")){
        // console.log(n.indexOf("/"))
        get_nums("/")
        a = parseInt(left_num) / parseInt(right_num)
        // console.log(a)
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        // console.log(n)     
        calc(n)   
    }else if(n.includes("x")){
        get_nums("x")
        a = parseInt(left_num) * parseInt(right_num)
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        calc(n) 
    }else if(n.includes("-")){
        get_nums("-")
        a = parseInt(left_num) - parseInt(right_num)
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        calc(n) 
    }
    else if(n.includes("+")){
        get_nums("+")
        a = parseInt(left_num) + parseInt(right_num)
        n.splice(left_idx+1,right_idx-left_idx-1,a)
        calc(n) 
    }
}

btn.forEach((b)=>{
    b.addEventListener("click",function(){
        // console.log(b.value)
        if(b.value!="AC" && b.value!="="){            
            if(op.includes(b.value)){
                if (op.includes(n[(n.length)-1])) {
                    n.pop()
                    n.push(b.value)
                } else if(n.length==0){
                    n.push(0)
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
            calc(n)
            ans.innerHTML=a
        }
    })
})