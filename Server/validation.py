#################################################
#                                               #
#              Validation Functions             #
#                                               #
################################################# 

# Dependencies
from config import apiSecret
from image_storage import entryExists

# Validate entry type field
def validateType(entryType):
    error = False
    message = ""
    if entryType == "":
        error = True
        message = "Type must be entered"
    return {"error": error, "message": message}

# Validate entry name field
def validateName(name):
    error = False
    message = ""
    if name == "":
        error = True
        message = "Name must be entered"
    elif entryExists(name):
        error = True
        message = "Name already exists"
    return {"error": error, "message": message}

# Validate authentication key field
def validateAuthentication(authentication):
    error = False
    message = ""
    if authentication == "":
        error = True
        message = "Authentication key must be entered"
    elif authentication != apiSecret:
        error = True
        message = "Authentication key is incorrect"
    return {"error": error, "message": message}

# Summarize validations
def validateFormFields(entryType, name, authentication):
    results = {}
    results["type"] = validateType(entryType)
    results["name"] = validateName(name)
    results["authentication"] = validateAuthentication(authentication)
    results["hasError"] = results["type"]["error"] or results["name"]["error"] or results["authentication"]["error"]
    return results

# Summarize edit validation
def validateEditFields(name, authentication):
    results = {}
    results["curName"] = validateName(name)
    results["editAuthentication"] = validateAuthentication(authentication)
    results["hasError"] = results["curName"]["error"] or results["editAuthentication"]["error"]
    return results