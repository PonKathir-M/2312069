const express = require("express");
const router = express.Router();

let notifications = [];
router.get("/", (req, res) => {
    res.json({
        success: true,
        data: notifications
    });
});

router.get("/unread-count", (req, res) => {

    const count = notifications.filter(n => !n.isRead).length;

    res.json({
        success: true,
        count
    });

});

router.get("/:id", (req, res) => {

    const notification = notifications.find(
        n => n.id == req.params.id
    );

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: "Notification not found"
        });
    }

    res.json({
        success: true,
        data: notification
    });

});

router.post("/", (req, res) => {

    const notification = {
        id: Date.now().toString(),
        ...req.body,
        isRead: false,
        createdAt: new Date()
    };

    notifications.push(notification);

    res.status(201).json({
        success: true,
        data: notification
    });

});

router.patch("/:id/read", (req, res) => {

    const notification = notifications.find(
        n => n.id === req.params.id
    )

    if(!notification) {
        return res.status(404).json({
            success:false,
            message: "Notification not found"
        })
    }

    notification.isRead = true;

    res.json({
        success: true,
        data: notification
    });

});

router.patch("/read-all", (req, res) => {

    notifications.forEach(n => n.isRead  = true);

    res.json({
        success:true,
        message:"All the notifications are marked as read"

    })

});

router.delete("/:id", (req, res) => {

    notifications = notifications.filter(
        n => n.id != req.params.id
    );

    res.json({
        success: true,
        message: "Deleted successfully"
    });

});

module.exports = router;