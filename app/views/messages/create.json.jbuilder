json.content @message.content
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %T")