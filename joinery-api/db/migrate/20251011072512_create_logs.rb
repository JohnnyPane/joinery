class CreateLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :logs do |t|
      t.string :species, null: false
      t.decimal :length, precision: 10, scale: 2, null: false
      t.decimal :diameter, precision: 10, scale: 2, null: false
      t.decimal :weight, precision: 10, scale: 2
      t.string :origin
      t.integer :moisture_content
      t.integer :grade

      t.timestamps
    end
  end
end
