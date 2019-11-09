export class GF{
    public Id = -1;
    public type = 1;
    //////////////////
    public fwxh = "";
    public fwzl = "";
    public fwjj = "";
    ///////////////////
    public dhs = 0;
    public kts = 0;
    public yxdzs = 0;
    public rsqs = 0;
    ///////////////////
    public qytdmj = 0;
    public fwmjhj = 0;
    public scmj:SCMJ = new SCMJ();
    public zjfmj:ZJFMJ = new ZJFMJ();
    ///////////////////
    public bbqrsl = 0;
    public bbqdjs = 0;
    public jtcy:HJQK[] = [];
    
}

export class SCMJ{
    public hj = 0;
    public syqzs = 0;
    public ghsp = 0;
    public fyws = 0;
    public gzs = 0;
    public mmqy = 0;
    public qtzm = 0;
}
export class ZJFMJ{
    public hj = 0;
    public dx = 0;
    public ecjys = 0;
    public yw = 0;
    public jyjs = 0;
    public jymj = 0;
    public pf = 0;
}

export class HJQK{
    public id = "";
    public pid = undefined;
    public fq: HJQK;
    public xm = null;
    public gx = null;
    public sfzh = null;
    public xb = null;
    public nl = 0;
    public sfzc = null;
    public sfjz = null;
    public gzdw = null;
    public lxdh = null;
    public zzqyr = null;
    public qswjzmr = null;
    public xsgbzxzf = null;
    public sfyh = null;

    constructor(){
        this.id = this.uuid();
    }

    public uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        
        var uuid = s.join("");
        return uuid;
    }
}