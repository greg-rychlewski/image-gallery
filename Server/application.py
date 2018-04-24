#################################################
#                                               #
#                 Dependencies                  #
#                                               #
################################################# 

# User-defined modules (configuration, helper functions, validation functions, image manipulation)
from config import cloudName, apiKey, apiSecret, allowedOrigins, allowedHeaders, allowedMethods
from validation import validateFormFields
from image_storage import getEntries, saveEntry, resetEntries

# Cloudinary (cloud image storage)
import cloudinary
import cloudinary.api
cloudinary.config( 
    cloud_name = cloudName, 
    api_key = apiKey, 
    api_secret = apiSecret
)

# Flask (web framework package)
from flask import Flask, request, make_response, jsonify
application = Flask(__name__)

#################################################
#                                               #
#                API End Points                 #
#                                               #
#################################################

# Create CORS response
def cors_response(body, status, mimetype):
    response = make_response(body, status)
    response.mimetype = mimetype
    response.headers["Access-Control-Allow-Origin"] = allowedOrigins
    response.headers["Access-Control-Allow-Headers"] = allowedHeaders
    response.headers["Access-Control-Allow-Methods"] = allowedMethods
    return response

# Routes
@application.route("/validate", methods=["POST", "OPTIONS"])
def validate():
    if request.method == "POST":
        entryType = str(request.get_json()["type"])
        name = str(request.get_json()["name"])
        authentication = str(request.get_json()["authentication"])
        validationResult = validateFormFields(entryType, name, authentication)

        if not validationResult["hasError"]:
            tag = str(request.get_json()["tag"])
            date = str(request.get_json()["date"])
            saveEntry(tag, name, entryType, date)

        return cors_response(jsonify(validationResult), 200, "application/json")
    
    return cors_response("", 204, "application/json")

@application.route("/validate-edit", methods=["POST", "OPTIONS"])
def validateEdit():
    if request.method == "POST":
        name = str(request.get_json()["curName"])
        authentication = str(request.get_json()["editAuthentication"])
        validationResult = validateEditFields(name, authentication)

        if not validationResult["hasError"]:
            serverId = str(request.get_json()["id"])
            entryType = str(request.get_json()["type"])
            date = str(request.get_json()["curDate"])
            editEntry(serverId, entryType, name, date)

        return cors_response(jsonify(validationResult), 200, "application/json")
    
    return cors_response("", 204, "application/json")

@application.route("/remove", methods=["POST", "OPTIONS"])
def remove():
    if request.method == "POST":
        tag = str(request.get_json()["tag"])
        cloudinary.api.delete_resources_by_tag(tag)

    return cors_response("", 204, "application/json")

@application.route("/entry-list", methods=["GET", "OPTIONS"])
def entryList():
    if request.method == "GET":
        return cors_response(jsonify(getEntries()), 200, "application/json")

    return cors_response("", 204, "application/json")

@application.route("/entry-images", methods=["POST", "OPTIONS"])
def entryImages():
    if request.method == "POST":
        prefix = str(request.get_json()["prefix"])
        images = cloudinary.api.resources(type="upload", prefix=prefix)
        return cors_response(jsonify({"images": images}), 200, "application/json")
    
    return cors_response("", 204, "application/json")

#################################################
#                                               #
#              Start Application                #
#                                               #
#################################################
if __name__ == "__main__":
    application.run()