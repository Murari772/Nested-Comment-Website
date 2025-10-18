from flask import Flask, jsonify, abort, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId 
import datetime 
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
CORS(app) 

def serialize_comment(comment):
    if "_id" in comment:
        comment["_id"] = str(comment["_id"])
    return comment

@app.route("/comments")
def get_comments():
    comments = list(mongo.db.Comments.find())
    return jsonify([serialize_comment(comment) for comment in comments])

@app.route("/comments/<commentid>/upvote", methods=["POST"])
def upvote(commentid):
    object_id = ObjectId(commentid)

    result = mongo.db.Comments.update_one(
        {"_id": object_id},
        {"$inc": {"upvotes": 1}}
    )

    updated_comment = mongo.db.Comments.find_one({"_id": object_id})
    return jsonify(serialize_comment(updated_comment))

@app.route("/comments/<commentid>/downvote", methods=["POST"])
def downvote(commentid):
    
    object_id = ObjectId(commentid)
        
    result = mongo.db.Comments.update_one(
        {"_id": object_id},
        {"$inc": {"upvotes": -1}} 
    )

    updated_comment = mongo.db.Comments.find_one({"_id": object_id})
    return jsonify(serialize_comment(updated_comment))

@app.route("/reply/<commentid>", methods=["POST"])
def addReply(commentid):
    REPLY_USER_ID = "a1b930c6-35c6-4d07-98ad-b55822c55047"
    
    data = request.get_json()
    reply_text = data.get("text")
    
    if not reply_text:
        return jsonify({"message": "Reply text is missing."}), 400

    last_comment_cursor = mongo.db.Comments.find().sort("id", -1).limit(1)
    last_comment_list = list(last_comment_cursor)  

    if last_comment_list:
        next_id = last_comment_list[0]["id"] + 1
    else:
        next_id = 501

    new_reply = {
        "id": next_id,
        "parent_id": int(commentid),
        "text": reply_text,
        "upvotes": 0,
        "created_at": datetime.datetime.now().isoformat(),
        "user_id": REPLY_USER_ID
    }

    result = mongo.db.Comments.insert_one(new_reply)
    new_reply["_id"] = str(result.inserted_id)

    return jsonify(serialize_comment(new_reply)), 201


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3000)