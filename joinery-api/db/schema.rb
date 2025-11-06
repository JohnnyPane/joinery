# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_11_06_161226) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.string "address_1", null: false
    t.string "address_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country", default: "US", null: false
    t.string "address_type", default: "shipping", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id", "address_type"], name: "index_addresses_on_addressable_and_type"
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "bids", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "buyer_id", null: false
    t.bigint "seller_id", null: false
    t.integer "amount_in_cents", null: false
    t.integer "status", default: 0, null: false
    t.text "message"
    t.datetime "accepted_at"
    t.datetime "rejected_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buyer_id"], name: "index_bids_on_buyer_id"
    t.index ["product_id"], name: "index_bids_on_product_id"
    t.index ["seller_id"], name: "index_bids_on_seller_id"
  end

  create_table "cart_items", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.bigint "product_id", null: false
    t.bigint "store_id", null: false
    t.integer "quantity", default: 0, null: false
    t.integer "unit_price_in_cents", null: false
    t.integer "total_price_in_cents", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "shipping_option_id"
    t.bigint "quote_request_id"
    t.index ["cart_id"], name: "index_cart_items_on_cart_id"
    t.index ["product_id"], name: "index_cart_items_on_product_id"
    t.index ["quote_request_id"], name: "index_cart_items_on_quote_request_id"
    t.index ["shipping_option_id"], name: "index_cart_items_on_shipping_option_id"
    t.index ["store_id"], name: "index_cart_items_on_store_id"
  end

  create_table "carts", force: :cascade do |t|
    t.bigint "user_id"
    t.boolean "guest", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "logs", force: :cascade do |t|
    t.string "species", null: false
    t.decimal "length", precision: 10, scale: 2, null: false
    t.decimal "diameter", precision: 10, scale: 2, null: false
    t.decimal "weight", precision: 10, scale: 2
    t.string "origin"
    t.integer "moisture_content"
    t.integer "grade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.bigint "store_id", null: false
    t.bigint "shipping_option_id", null: false
    t.integer "quantity", default: 1, null: false
    t.integer "shipping_cost_in_cents", default: 0, null: false
    t.integer "unit_price_in_cents", null: false
    t.integer "total_price_in_cents", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_transfer_id"
    t.integer "status", default: 0, null: false
    t.bigint "quote_request_id"
    t.index ["order_id", "product_id"], name: "index_order_items_on_order_id_and_product_id", unique: true
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
    t.index ["quote_request_id"], name: "index_order_items_on_quote_request_id"
    t.index ["shipping_option_id"], name: "index_order_items_on_shipping_option_id"
    t.index ["store_id"], name: "index_order_items_on_store_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "status", default: 0, null: false
    t.string "stripe_charge_id"
    t.string "stripe_payment_intent_id"
    t.string "tracking_number"
    t.string "customer_email", null: false
    t.string "customer_phone_number"
    t.string "customer_name"
    t.integer "total_amount_in_cents", default: 0, null: false
    t.boolean "paid", default: false, null: false
    t.boolean "billing_same_as_shipping", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_email"], name: "index_orders_on_customer_email"
    t.index ["paid"], name: "index_orders_on_paid"
    t.index ["status"], name: "index_orders_on_status"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "price_in_cents", null: false
    t.integer "quantity", default: 0, null: false
    t.bigint "store_id", null: false
    t.boolean "is_active", default: true, null: false
    t.string "productable_type", null: false
    t.bigint "productable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "requestable", default: false, null: false
    t.boolean "biddable", default: false, null: false
    t.integer "min_bid_amount_in_cents"
    t.index ["productable_type", "productable_id"], name: "index_products_on_productable"
    t.index ["requestable"], name: "index_products_on_requestable"
    t.index ["store_id"], name: "index_products_on_store_id"
  end

  create_table "quote_requests", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "buyer_id", null: false
    t.bigint "seller_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quote_type", default: 0, null: false
    t.bigint "parent_quote_request_id"
    t.index ["buyer_id"], name: "index_quote_requests_on_buyer_id"
    t.index ["parent_quote_request_id"], name: "index_quote_requests_on_parent_quote_request_id"
    t.index ["product_id"], name: "index_quote_requests_on_product_id"
    t.index ["seller_id"], name: "index_quote_requests_on_seller_id"
  end

  create_table "quotes", force: :cascade do |t|
    t.bigint "quote_request_id", null: false
    t.string "author_type", null: false
    t.bigint "author_id", null: false
    t.integer "amount_in_cents", null: false
    t.integer "action"
    t.text "message"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_quotes_on_author"
    t.index ["quote_request_id"], name: "index_quotes_on_quote_request_id"
  end

  create_table "shipping_options", force: :cascade do |t|
    t.string "name", default: ""
    t.integer "price_in_cents", default: 0
    t.integer "shipping_type", default: 0, null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_shipping_options_on_product_id"
  end

  create_table "slabs", force: :cascade do |t|
    t.string "species", null: false
    t.integer "slab_type", default: 0, null: false
    t.decimal "width", precision: 10, scale: 2, null: false
    t.decimal "length", precision: 10, scale: 2, null: false
    t.decimal "height", precision: 10, scale: 2, null: false
    t.decimal "weight", precision: 10, scale: 2
    t.boolean "dried", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "store_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "store_id", null: false
    t.integer "role", default: 0, null: false
    t.boolean "is_default", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["store_id"], name: "index_store_users_on_store_id"
    t.index ["user_id"], name: "index_store_users_on_user_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "location"
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_account_id"
    t.boolean "charges_enabled", default: false, null: false
    t.boolean "details_submitted", default: false, null: false
    t.index ["owner_id"], name: "index_stores_on_owner_id"
    t.index ["stripe_account_id"], name: "index_stores_on_stripe_account_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quotes_awaiting_action_count", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bids", "products"
  add_foreign_key "bids", "stores", column: "seller_id"
  add_foreign_key "bids", "users", column: "buyer_id"
  add_foreign_key "cart_items", "carts"
  add_foreign_key "cart_items", "products"
  add_foreign_key "cart_items", "quote_requests"
  add_foreign_key "cart_items", "shipping_options"
  add_foreign_key "cart_items", "stores"
  add_foreign_key "carts", "users"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "order_items", "quote_requests"
  add_foreign_key "order_items", "shipping_options"
  add_foreign_key "order_items", "stores"
  add_foreign_key "orders", "users"
  add_foreign_key "products", "stores"
  add_foreign_key "quote_requests", "products"
  add_foreign_key "quote_requests", "quote_requests", column: "parent_quote_request_id"
  add_foreign_key "quote_requests", "stores", column: "seller_id"
  add_foreign_key "quote_requests", "users", column: "buyer_id"
  add_foreign_key "quotes", "quote_requests"
  add_foreign_key "shipping_options", "products"
  add_foreign_key "store_users", "stores"
  add_foreign_key "store_users", "users"
  add_foreign_key "stores", "users", column: "owner_id"
end
