# README

# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null:false|
|mail|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many: members
- has_many: users, through: :members
- has_many: messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: user
- belongs_to: group
