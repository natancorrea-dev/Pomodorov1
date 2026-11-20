// console.log("Seu JS carregou!")
let valor = 0
let tempoRestante = 0 
let intervalo = null

function iniciarTimer(){
    const minutos = Number(document.getElementById("minutos").value) || 0

    if(minutos <= 0){
        alert("Digite um tempo maior que zero")
        return
    }
    
    tempoRestante = minutos * 60
    stopper()
    atualizaVisor()
    
    // pararTime()
    
    // atualizarVisor()
    
    intervalo = setInterval(() => {
        tempoRestante--
        
        if (tempoRestante <= 0){
            tempoRestante = 0
            stopper()
            alert("Tempo finalizado")
        }
        
        atualizaVisor()
    }, 1000);
}


function atualizaVisor(){
    const minutos = Math.floor(tempoRestante / 60)
    const segundos = tempoRestante % 60
    
    const minutosFormatados = String(minutos).padStart(2, "0")
    const segundosFormatados = String(segundos).padStart(2, "0")
    
    document.getElementById("contador").textContent = `${minutosFormatados}:${segundosFormatados}`
}


function incrementar(){
   tempoRestante += 60
   atualizaVisor()
}

function diminuir(){
    if(tempoRestante > 0){
        tempoRestante -= 60
        atualizaVisor()
    }
}

function stopper(){
    if (intervalo !== null){
        clearInterval(intervalo)
        intervalo = null
    }
}

function reiniciar(){
    stopper()
    
    tempoRestante = 0
    console.log("Minutos:", minutos)
    console.log("Tempo restante:", tempoRestante)
    atualizaVisor()
}


const roda = document.getElementById("roda")

let arrastando = false
let anguloAnterior = 0
let rotacaoAcumulada = 0

roda.addEventListener("pointerdown", iniciarArraste)
roda.addEventListener("pointermove", moverRoda)
roda.addEventListener("pointerup", pararArraste)
roda.addEventListener("pointercancel", pararArraste)

function iniciarArraste(evento){
    arrastando = true
    anguloAnterior = calcularAngulo(evento)

    roda.setPointerCapture(evento.pointerId)
}

function moverRoda(evento){
    if(!arrastando) return

    const anguloAtual = calcularAngulo(evento)
    let diferenca = anguloAtual - anguloAnterior

    if (diferenca > 180){
        diferenca -= 360
    }

    else if (diferenca < -180){
        diferenca += 360
    }

    rotacaoAcumulada += diferenca
    anguloAnterior = anguloAtual

    while (rotacaoAcumulada >= 30){
        incrementar()
        rotacaoAcumulada -=30
    }

    while (rotacaoAcumulada <= -30){
        diminuir()
        rotacaoAcumulada += 30
    }
    roda.style.transform = `rotate(${rotacaoAcumulada}deg)`
}

function pararArraste(){
    arrastando = false
}

function calcularAngulo(evento){
    const rect = roda.getBoundingClientRect()

    const centroX = rect.left + rect.width / 2
    const centroY = rect.top + rect.height / 2

    const x = evento.clientX - centroX
    const y = evento.clientY - centroY

    return Math.atan2(y, x) * (180 / Math.PI)
}
