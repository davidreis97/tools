export function getSmallestSubnet(ips: string[]) {
    var addresses = [];

    ips = ips.map(a => a.replace(/[^\d.-]/g,'')).filter((a) => a.length > 0);
    
    for(var ip of ips){
        addresses.push(ipToNumber(ip));
    }

    return calculateSubnet(addresses);
}

function calculateSubnet(numbers: number[]){
    var wildCard = 0;
    var netMask = Math.pow(2,32) - 1;

    for(var maskBits = 32; maskBits >= 0; maskBits--){
        var nSet = new Set(numbers);

        if (nSet.size <= 1){
            break;
        }

        netMask <<= 1;
        wildCard <<= 1;
        wildCard += 1;

        numbers.forEach((n,i) => numbers[i] = n >> 1);
    }

    var baseAddress = numbers[0] << (32 - maskBits);

    return {
        baseAddress: numberToIp(baseAddress), 
        maskBits, 
        netMask: numberToIp(netMask), 
        wildCardBits: 32 - maskBits, 
        wildCard: numberToIp(wildCard),
        broadcast: numberToIp(baseAddress + wildCard),
        hostMin: numberToIp(baseAddress + 1),
        hostMax: numberToIp(baseAddress + wildCard - 1),
        hostCount: wildCard - 1
    }
}

function ipToNumber(ip: string) {
    var currentAddress = 0;
    var parts = ip.split(".");
    for(var part of parts){
        currentAddress <<= 8;
        currentAddress += parseInt(part);
    }
    return currentAddress;
}

function numberToIp(ip: number) {
    var parts = [];
    for(var i = 0; i < 4; i++){
        var segment = ip & 0xFF;
        parts.unshift(segment);
        ip >>= 8;
    }

    return parts.join(".");
}