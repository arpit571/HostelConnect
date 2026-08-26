const serializeComplaint = (complaint, viewer) => {
    const data = complaint.toObject();

    if (
        complaint.privacyLevel === "anonymous" &&
        viewer.role !== "admin"
    ) {
        delete data.student;
    }

    return data;
};

module.exports = serializeComplaint;