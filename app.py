from flask import Flask, jsonify, render_template
import data  # Import your data module

app = Flask(__name__, static_folder='front-end/assets', template_folder='.')

# Route for the homepage
@app.route("/")
def home():
    return render_template("index.html", profile=data.profile, courseSkills = data.courseSkills, education=data.education,
                           work_history=data.work_history, extracurriculars=data.extracurriculars, certificates = data.certificates)

@app.route("/api/education")
def get_education():
    try:
        return jsonify(data.education)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/courseSkills")
def get_courseSkills():
    try:
        return jsonify(data.courseSkills)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/workHistory")
def get_workHistory():
    try:
        return jsonify(data.work_history)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/extracurriculars")
def get_extracurriculars():
    try:
        return jsonify(data.extracurriculars)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/certificates")
def get_certificates():
    try:
        return jsonify(data.certificates)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)  # Set debug to False in production
