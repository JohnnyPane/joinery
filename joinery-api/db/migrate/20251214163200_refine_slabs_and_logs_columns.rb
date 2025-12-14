class RefineSlabsAndLogsColumns < ActiveRecord::Migration[8.0]
  def change
    change_table :slabs, bulk: true do |t|
      t.rename :width, :width_at_narrowest_in_inches
      t.rename :height, :thickness_in_inches
      t.rename :length, :length_in_inches
      t.rename :dried, :kiln_dried

      t.decimal :width_at_widest_in_inches, precision: 10, scale: 2, default: 0.0, null: false
      t.decimal :calculated_board_feet, precision: 10, scale: 2, default: 0.0, null: false

      t.decimal :moisture_content_percent, precision: 5, scale: 2
      t.integer :drying_status, default: 0

      t.rename :weight, :weight_in_pounds
    end

    change_table :logs, bulk: true do |t|
      t.rename :length, :length_in_feet
      t.rename :diameter, :diameter_at_small_end_in_inches
      t.rename :weight, :weight_in_pounds

      t.decimal :diameter_at_large_end_in_inches, precision: 10, scale: 2
      t.decimal :estimated_board_feet, precision: 10, scale: 2, default: 0.0, null: false
      t.integer :log_rule, default: 0

      t.remove :moisture_content, type: :integer, default: 0
      t.decimal :moisture_content_percent, precision: 5, scale: 2
    end
  end
end
