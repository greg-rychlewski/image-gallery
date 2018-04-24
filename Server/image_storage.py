#################################################
#                                               #
#            Image Storage Functions            #
#                                               #
################################################# 

# Dependencies
import cloudinary
import cloudinary.uploader
import cloudinary.api
import pickle
from pathlib import Path
from helper import toYYYYMM

# Generate unique ID for entry on the server
def generateId():
    lastIdPickle = Path("./last-id.pickle")
    lastId = pickle.load(open(str(lastIdPickle), "rb"))
    lastId += 1
    pickle.dump(lastId, open(str(lastIdPickle), "wb"))
    return lastId

# Save list of entries in an array and keep a separate dictionary to look up entry info by id
def saveInfo(name, entryType, date, serverId, numPages):
    entriesPickle = Path("./entries.pickle")
    entries = pickle.load(open(str(entriesPickle), "rb"))
    entries.append(
        {
            "id": serverId, 
            "numPages": numPages, 
            "type": entryType, 
            "name": name, 
            "date": {"display": date, "compare": toYYYYMM(date)}
        }
    )
    pickle.dump(entries, open(str(entriesPickle), "wb"))

# List all temporary uploaded images
def listImages(tag):
    return cloudinary.api.resources_by_tag(tag)["resources"]

# Move temporary images to permanent folder
def moveImages(tag, images, name, entryType, serverId):
    prefix = entryType + "/" + name + "/"

    for image in images:
        oldId = image["public_id"]
        newId = prefix + oldId.split("_")[1]
        cloudinary.uploader.remove_tag(tag, oldId)
        cloudinary.uploader.rename(oldId, newId)
        cloudinary.uploader.add_tag(serverId, newId)

# Save new entry information
def saveEntry(tag, name, entryType, date):
    images = listImages(tag)
    if len(images) == 0:
        return
    serverId = generateId()
    moveImages(tag, images, name, entryType, serverId)
    saveInfo(name, entryType, date, serverId, len(images))
    
# Check if entry name already exists
def entryExists(name):
    for entry in getEntries():
        if entry["name"].lower() == name.lower():
            return True
    return False

# List all entry information currently stored on server
def getEntries():
    entriesPickle = Path("./entries.pickle")
    entries = pickle.load(open(str(entriesPickle), "rb"))
    return entries

# Remove all entry information from server
def resetEntries():
    # Clear list of entries
    entriesPickle = Path("./entries.pickle")
    empty = []
    pickle.dump(empty, open(str(entriesPickle), "wb"))

    # Reset last id back to 0
    lastIdPickle = Path("./last-id.pickle")
    lastId = 0
    pickle.dump(lastId, open(str(lastIdPickle), "wb"))