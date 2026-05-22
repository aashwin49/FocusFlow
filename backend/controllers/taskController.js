import Task from "../models/Task.js";

// CREATE
export const createTask = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const task = await Task.create({
      ...req.body,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// GET (FULLY UPGRADED)
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;

    //  VALIDATION
    const validStatuses = ["todo", "in-progress", "completed"];
    const validPriorities = ["low", "medium", "high"];
    const allowedSortFields = ["createdAt", "dueDate"];

    if (req.query.status && !validStatuses.includes(req.query.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    if (req.query.priority && !validPriorities.includes(req.query.priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority value",
      });
    }

    let sort = req.query.sort || "-createdAt";
    const sortField = sort.startsWith("-") ? sort.slice(1) : sort;

    if (!allowedSortFields.includes(sortField)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
      });
    }

    //  BASE FILTER (SECURITY)
    const filter = {
      createdBy: userId,
    };

    //  FILTERING
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    // Multi-tag filtering
    if (req.query.tags) {
      const tagsArray = req.query.tags.split(",");
      filter.tags = { $in: tagsArray };
    }

    //  Search (title + description)
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    //  Due date range
    if (req.query.dueDateFrom || req.query.dueDateTo) {
      filter.dueDate = {};

      if (req.query.dueDateFrom) {
        filter.dueDate.$gte = new Date(req.query.dueDateFrom);
      }

      if (req.query.dueDateTo) {
        filter.dueDate.$lte = new Date(req.query.dueDateTo);
      }
    }

    // PAGINATION (SAFE LIMITS)
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;

    //  COUNT TOTAL DOCUMENTS
    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / limit);

    //  FETCH DATA (LEAN FOR PERFORMANCE)
    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // 7️⃣ RESPONSE
    res.status(200).json({
      success: true,
      count: tasks.length,
      page,
      pages: totalPages,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE (SAFE UPDATE)
export const updateTask = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Only allow safe fields
    const allowedUpdates = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
      "tags",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (err) {
    next(err);
  }
};