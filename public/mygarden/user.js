var user = "andre"

function getUniqueId() {
	var date = new Date();
	return user + date.getTime().toString();
}
