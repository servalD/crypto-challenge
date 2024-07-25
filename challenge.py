import requests
from eth_account import Account
import secrets
from hashlib import sha256
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_PKCS1_v1_5
from base64 import b64decode, b64encode


baseUrl = "http://34.163.219.17:3000/"

def generateAddress():
    priv = secrets.token_hex(32)
    private_key = "0x" + priv
    print ("SAVE BUT DO NOT SHARE THIS:", private_key)
    acct = Account.from_key(private_key)
    print("Address:", acct.address)
    return acct.address

address = generateAddress()

def subscribe():
    ret = requests.post(baseUrl + "subscribe", json={"Name": "gaetan", "Address": address})

    if ret.status_code == 201:
        return ret.json()
    raise Exception("Failed to subscribe")

def getHashChallenge():
    ret = requests.get(
        baseUrl + "challenge/hash/" + address
    )
    if ret.status_code == 200:
        return ret.json()
    raise Exception("Failed to get the challenge")

def verifyHash(hashChallenge, hash):
    ret = requests.post(
        baseUrl + "challenge/hash/" + address + "/" + hashChallenge["challenge_id"],
        json={"Sentence": hashChallenge["sentence"], "Hash":hash},
    )
    if ret.status_code == 200:
        return ret.json()
    raise Exception("Hash challenge failed")

def getCypherChallenge():
    ret = requests.get(baseUrl + "challenge/encrypt/" + address)
    if ret.status_code == 200:
        return ret.json()
    raise Exception("Failed to get the challenge")


def verifyCypher(chypherChallenge, cypherText):
    ret = requests.post(
        baseUrl + "challenge/hash/" + address + "/" + chypherChallenge["challenge_id"],
        json={"Sentence": chypherChallenge["sentence"], "cyphertext": cypherText},
    )
    if ret.status_code == 200:
        return ret.json()
    raise Exception("Cypher challenge failed")


subscribeMsg = subscribe()

hashChallenge = getHashChallenge()

hash = sha256(hashChallenge["sentence"].encode("utf-8")).hexdigest()

hashMsg = verifyHash(hashChallenge, hash)

cypherChallenge = getCypherChallenge()

keyPub = RSA.importKey(cypherChallenge["public_key"])
cipher = Cipher_PKCS1_v1_5.new(keyPub)
cipher_text = cipher.encrypt(cypherChallenge["sentence"].encode())


cypherMsg = verifyCypher(cypherChallenge, cipher_text)

print(cypherMsg)
