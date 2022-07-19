export function getSmallestSubnet(ips: string[], mustBeUsableAddress: boolean, maxMaskSize: number) {
    var addresses = [];

    // Remove characters that are not numbers or dots. Remove empty elements.
    ips = ips.map(a => a.replace(/[^\d.-]/g,'')).filter((a) => a.length > 0);

    for(var ip of ips){
        addresses.push(ipToNumber(ip));
    }

    return calculateSubnet(addresses, mustBeUsableAddress, maxMaskSize);
}

function calculateSubnet(addresses: number[], mustBeUsableAddress: boolean, maxMaskSize: number){
    var wildCard = 0;
    var netMask = Math.pow(2,32) - 1;

    if(mustBeUsableAddress){
        // Add +1 to the largest address and -1 to the smallest so that we ensure that the broadcast and base address are not one of the input addresses.
        var largest = Math.max.apply(null, addresses);
        var smallest = Math.min.apply(null, addresses);

        addresses.push(largest + 1, smallest - 1);
    }

    for(var maskBits = 32; maskBits > 0; maskBits--){
        var nSet = new Set(addresses);

        if (nSet.size <= 1 && maskBits <= maxMaskSize){
            break;
        }

        netMask <<= 1;
        wildCard <<= 1;
        wildCard += 1;

        addresses.forEach((n,i) => addresses[i] = n >> 1);
    }

    var baseAddress = addresses[0] << (32 - maskBits);

    return {
        baseAddress: numberToIp(baseAddress), 
        maskBits, 
        netMask: numberToIp(netMask), 
        wildCardBits: 32 - maskBits, 
        wildCard: numberToIp(wildCard),
        broadcast: numberToIp(baseAddress + wildCard),
        hostMin: numberToIp(baseAddress + 1),
        hostMax: numberToIp(baseAddress + wildCard - 1),
        hostCount: wildCard == 0 ? 0 : wildCard - 1 >>> 0
    }
}

function ipToNumber(ip: string) {
    var currentAddress = 0;
    var parts = ip.split(".");
    for(var part of parts){
        currentAddress <<= 8;
        currentAddress += parseInt(part);
    }
    return currentAddress>>>0;
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