class Block{
    constructor(timestamp, previousHash, hash, data){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data =data;
    }
    
    static get genesis(){
        const timestamp = (new Date(2020, 0, 1)).getTime();
        return new this(timestamp, undefined, 'Genezi-hash', 'zero');
    }
    //metodo Tostring para devolver inf almacenada en el bloque
    toString(){
        const{
            timestamp, previousHash, hash, data,
        } = this;
                                                        //cadena de texto
        return `Block -                          
        timestamp    : ${timestamp}
        previousHash : ${previousHash}
        hash         : ${hash}
        data         : ${data}
        `;
    }
}

export default Block; 