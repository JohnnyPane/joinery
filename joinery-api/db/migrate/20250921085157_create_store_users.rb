class CreateStoreUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :store_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :store, null: false, foreign_key: true
      t.integer :role, null: false, default: 0
      t.boolean :is_default, null: false, default: false

      t.timestamps
    end
  end
end
