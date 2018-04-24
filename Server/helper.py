#################################################
#                                               #
#                Helper Functions               #
#                                               #
################################################# 

# Get year from string containing month and year (eg "January 2012")
def dateYear(dateString):
    return dateString.split()[1]

# Get month from string containing month and year (eg "January 2012")
def dateMonth(dateString):
    return dateString.split()[0]

# Get number of month from string containing full month name
def monthNum(monthString):
    months = {
        "january": "01", 
        "february": "02", 
        "march": "03", 
        "april": "04", 
        "may": "05", 
        "june": "06", 
        "july": "07", 
        "august": "08",
        "september": "09",
        "october": "10",
        "november": "11",
        "december": "12"
    }

    return months[monthString.lower().strip()]

# Convert string containing month and year (eg "January 2012") to YYYYMM (eg "201201")
def toYYYYMM(dateString):
    if dateString.isdigit():
        dateString += "01"
    elif dateString.isalpha():
        dateString = monthNum(dateString)
    elif dateString != "":
        dateString = dateYear(dateString) + monthNum(dateMonth(dateString))

    return dateString