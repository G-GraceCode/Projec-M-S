import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import handleUpload from "../cloudinaryUpload/cloudUpload.js";

// route POST /createproject
// @access public

const createProject = asyncHandler(async (req, res) => {
  try {
    // gettting the image and reanaming it parts when it is Uploaded
    const { originalname, path } = req.file;
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    // req for title, content, summary, category
    const {
      title,
      category,
      content,
      summary,
      toDate,
      fromDate,
      comProject,
      projectUrl,
    } = req.body;
    const user = await User.findById(req.user._id);
    const projectImage = await handleUpload(newPath);

    if (user) {
      const data = await Project.create({
        title,
        summary,
        category,
        content,
        toDate,
        fromDate,
        comProject,
        projectUrl,
        coverImg: projectImage.secure_url,
        author: user._id,
      });
      res.status(200).json(data);
      res.redirect("/allprojects");
    } else {
      res.status(200).json({ message: "User not Found" });
      console.log("user not found");
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

// route update /project
// @access private getting projects of a particular user

const editProject = asyncHandler(async (req, res) => {
  try {
    let newPath;
    // gettting the image and reanaming it parts when it is Uploaded
    if (req.file) {
      const { originalname, path } = req.file;
      const part = originalname.split(".");
      const ext = part[part.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    // req for title, content, summary, category
    const { id } = req.params;
    const {
      title,
      category,
      content,
      summary,
      projectUrl,
      toDate,
      fromDate,
      comProject,
    } = req.body;
    const project = await Project.findById(id);
    if (!project) {
      res.status(401).send("Preject Not Found");
      console.log("Project not found");
      return;
    } else {
      project.title = title;
      project.summary = summary;
      project.category = category;
      project.content = content;
      project.projectUrl = projectUrl;
      project.toDate = toDate;
      project.fromDate = fromDate;
      project.comProject = comProject;

      if (req.file) {
        const projectNewImage = await handleUpload(newPath);
        project.coverImg =
          newPath != undefined ? projectNewImage.secure_url : project.coverImg;
      }

      const updatedProject = await project.save();
      console.log(updatedProject);
      res.status(200).json({
        title: updatedProject.title,
        summary: updatedProject.summary,
        category: updatedProject.category,
        content: updatedProject.content,
        coverImg: updatedProject.coverImg,
        projectUrl: updatedProject.projectUrl,
        projectUrl: updatedProject.toDate,
        projectUrl: updatedProject.fromDate,
        projectUrl: updatedProject.comProject,
      });
      res.redirect("/allprojects");
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

// route get /project
// @access private getting projects of a particular user

const getUserProjects = asyncHandler(async (req, res) => {
  try {
    const author = req.user._id;

    // Now we Sor the project in descending order of date created
    const projects = await Project.find({ author })
      .sort({ createdAt: -1 })
      .limit(5); //.populate("author", ["username"]);
    if (projects.length >= 1) {
      res.status(200).json(projects);
    } else {
      res.status(201).json({ message: "No Project Created" });
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

// Route get /getAllProject
// @access Public projects from every users
const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const { month, year, sort } = req.query;
    console.log(month, year, sort);
    let projects = await Project.find({})
      .populate("author", [
        "username",
        "profile",
        "bio",
        "folioLink",
        "linkedin",
        "behance",
        "profession",
      ])
      .sort({ createdAt: -1 })
      .limit(10);

    if (projects.length >= 1) {
      if (sort) {
        projects = projects.filter((project) =>
          sort == "true"
            ? project.comProject === true
            : sort === "newproject"
              ? new Date(project.createdAt).getTime() <= new Date().getTime()
              : sort === "oldproject"
                ? new Date(project.fromDate) <= new Date().now()
                : project.comProject === false,
        );
      }
      if (month) {
        projects = projects.filter(
          (project) =>
            new Date(project.toDate).getMonth() == month ||
            new Date(project.fromDate).getMonth() == month,
        );
      }
      if (year) {
        projects = projects.filter(
          (project) =>
            new Date(project.toDate).getFullYear() == year ||
            new Date(project.createdAt).getFullYear() == year,
        );
      }
      res.status(200).json(projects);
    } else {
      res.status(201).json({ message: "No Project Created" });
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

// Route get /getAllProject
// @access Public projects from every users
const getProjectBySearch = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.query.search;
    console.log("searchTerm", searchTerm);

    const projects = await Project.find({
      $text: {
        $search: searchTerm,
        $caseSensitive: true,
      },
    })
      .populate("author", [
        "username",
        "profile",
        "bio",
        "folioLink",
        "linkedin",
        "behance",
        "profession",
      ])
      .sort({ createdAt: -1 })
      .limit(10);

    // projects = await Project.find({})
    //   .populate("author", ["username", "profile"])
    //   .sort({ createdAt: -1 })
    //   .limit(10);

    // console.log("projects", projects);
    if (projects.length >= 1) {
      res.status(200).json(projects);
    } else {
      res.status(201).json({ message: "No Project Created" });
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

//Rout get /autoCompleteSearch
//@access public

const autoCompleteSearch = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.query.search;
    if (searchTerm.length > 0) {
      const agg = [
        {
          $search: {
            index: "projectsSeach",
            compound: {
              should: [
                {
                  autocomplete: {
                    query: searchTerm,
                    path: "title",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      maxExpansions: 256,
                    },
                  },
                },
                {
                  autocomplete: {
                    query: searchTerm,
                    path: "category",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      maxExpansions: 256,
                    },
                  },
                },
              ],
              minimumShouldMatch: 1,
            },
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 1,
            title: 1,
            category: 1,
          },
        },
      ];

      const projects = await Project.aggregate(agg);

      // console.log("projects", projects);
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(201).json({ message: "No Result Found" });
      }
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

//route get/project/:id
//@access public get a particular project  by id
const getAproject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const theProject = await Project.findById(id).populate("author", [
      "username",
      "profile",
    ]);
    res.status(200).json(theProject);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// @des delete user profile
// route Get /project/deleteproject/:id
// @access private

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(401).json({ message: "Project not Not Found" });
    }

    res.status(200).json({
      message: "Project Deleted Successfully",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const displayDashboard = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    const { profession } = user;
    console.log("prof", profession);
    let projects = await Project.find({}).populate("author", [
      "username",
      "profile",
    ]);

    let projectByprof = projects.filter(
      (project) => project.category === profession,
    );

    const projectResult = {
      success: true,
      topRecent: projects.splice(0, Number(2)),
      topProjectByPro: projectByprof.length === 0 ? projects : projectByprof,
    };

    console.log("pro", projectResult);

    res.status(200).json(projectResult);
  } catch (e) {
    res.status(500);
    throw new Error({ message: e.message });
  }
});

export {
  createProject,
  displayDashboard,
  getAllProjects,
  getProjectBySearch,
  getUserProjects,
  getAproject,
  editProject,
  deleteProject,
  autoCompleteSearch,
};
