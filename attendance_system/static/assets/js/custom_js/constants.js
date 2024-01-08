// gallery messages
var confirm_photo_delete_message = "Delete photo?"
var photo_deleted_message = "Photo deleted."
var confirm_gallery_delete_message = "Delete album?"
var album_deleted_message = "Album deleted."
var updated_gallery_status_message = "Status updated"

// for all
var confirm_update_status = "Update status?"
var status_updated_message = "Records updated!"
var confirm_delete_records = "Delete records?"
var records_deleted_message = "Records deleted."
var global_status_updated_message = "Status updated!"
var confirm_delete_single_record = "Delete record?"
var single_record_deleted_message = "Record deleted."

function update_record_confirmation_message(number_of_records) {
	return "Update " + number_of_records + " records?";
}

function delete_record_confirmation_message(number_of_records) {
	return "Delete " + number_of_records + " records?";
}


// DPR messages
var dpr_archive_confirm_message = "Archive records?"
var dpr_archived_message = "Records archived!"
var export_successfull_message = "Records exported to TRAIN!"
var select_dpr_to_export_message = "Select records to export to TRAIN."
var print_dpr_message = "Please select a DPR to print"
var download_dpr_message = "Please select a DPR to download a CSV"
var download_dpr_history_message = "'Please select a DPR history to download a CSV'"

var work_hour_error_message = "You can't submit more than 24 work hours on a single day."
//export dpr message function
function export_record_confirmation_message(number_of_records) {
	return "Export " + number_of_records + " records?";
}

//class roaster messages

var print_class_roaster_message = "No data to print."
var download_class_roaster_message = "No data to download."

// Events messages
var confirm_delete_event_message = "Delete event?"
var event_deleted_message = "Event deleted."
var confirm_delete_event_type_message = "Delete event type?"
var event_type_deleted_message = "Event type deleted."

// History messages
var confirm_unarchive_record_message = "Unarchive record?"
var record_archived_message = "Record unarchived!"

//Reorder Messages
var data_reordered_message = "Data reordered successfully"
var data_reorder_fail_message = "Failed to reorder data"

// Unauthorize messages
var unauthorize_message = "You are not authorized for this operation."

//App messages

var delete_app_confirmation_message = "Delete app?"
var deleted_app_message = "App deleted!"

var delete_icon_confirmation_message = "Delete icon pack?"
var deleted_icon_message = "Icon pack deleted!"