class CreateTimbers < ActiveRecord::Migration[8.0]
  def change
    create_table :timbers do |t|
      t.string "species", null: false

      t.decimal "thickness_in_inches", precision: 6, scale: 2, null: false
      t.decimal "width_in_inches", precision: 6, scale: 2, null: false
      t.integer "length_in_feet", null: false
      t.string "nominal_dimension", null: false
      t.decimal "board_feet", precision: 8, scale: 2

      t.string "grading_standard"
      t.integer "heart_content_type", default: 0, null: false
      t.integer "surface_finish_type", default: 0, null: false
      t.integer 'moisture_condition', default: 0, null: false
      t.string "preservative_treatment"
      t.string "end_cut_style"

      t.timestamps

      t.index ["species"], name: "index_timbers_on_species"
      t.index ["nominal_dimension"], name: "index_timbers_on_nominal_dimension"
      t.index ["heart_content_type"], name: "index_timbers_on_heart_content_type"
      t.index ["surface_finish_type"], name: "index_timbers_on_surface_finish_type"
      t.index ["moisture_condition"], name: "index_timbers_on_moisture_condition"
      t.index ["preservative_treatment"], name: "index_timbers_on_preservative_treatment"
      t.index ["end_cut_style"], name: "index_timbers_on_end_cut_style"
      t.index ["length_in_feet"], name: "index_timbers_on_length_in_feet"
      t.index ["board_feet"], name: "index_timbers_on_board_feet"
    end
  end
end
