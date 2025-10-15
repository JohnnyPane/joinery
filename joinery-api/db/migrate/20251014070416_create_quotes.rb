class CreateQuotes < ActiveRecord::Migration[8.0]
  def change
    create_table :quotes do |t|
      t.references :quote_request, null: false, foreign_key: true
      t.references :author, polymorphic: true, null: false
      t.integer :amount_in_cents, null: false
      t.integer :action
      t.text :message
      t.string :role

      t.timestamps
    end
  end
end
